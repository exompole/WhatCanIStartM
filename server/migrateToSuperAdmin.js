const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/whatcanistart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const migrateToSuperAdmin = async () => {
  try {
    console.log('Starting super admin migration...');

    // Find the admin user (assuming it's the one with ADMIN_EMAIL)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('ADMIN_EMAIL not found in environment variables');
      return;
    }

    // Update the admin to super-admin role
    const result = await User.updateOne(
      { email: adminEmail },
      {
        $set: {
          role: 'super-admin',
          isApproved: true,
          isAdmin: true // Keep legacy field for backward compatibility
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`✅ Successfully updated admin (${adminEmail}) to super-admin role`);
    } else {
      console.log(`ℹ️  Admin (${adminEmail}) already has super-admin role or not found`);
    }

    // Set default roles for users without roles
    const defaultRoleResult = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );

    console.log(`✅ Set default role 'user' for ${defaultRoleResult.modifiedCount} users`);

    // Ensure all existing admins are properly categorized
    const adminUpdateResult = await User.updateMany(
      { isAdmin: true, role: { $nin: ['admin', 'super-admin'] } },
      { $set: { role: 'admin' } }
    );

    console.log(`✅ Updated ${adminUpdateResult.modifiedCount} legacy admins to 'admin' role`);

    // Display current role distribution
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n📊 Current role distribution:');
    roleStats.forEach(stat => {
      console.log(`   ${stat._id || 'no role'}: ${stat.count} users`);
    });

    console.log('\n✅ Super admin migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  migrateToSuperAdmin();
}

module.exports = migrateToSuperAdmin;
