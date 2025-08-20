const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/whatcanistart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setSuperAdmin = async () => {
  try {
    console.log('Setting up super admin...');

    // Find the first admin user (with isAdmin: true)
    const adminUser = await User.findOne({ isAdmin: true });
    
    if (!adminUser) {
      console.log('No admin user found. Creating one...');
      
      // Create a super admin user
      const superAdmin = new User({
        username: 'superadmin',
        firstname: 'Super',
        surname: 'Admin',
        email: 'admin@whatcanistart.com',
        phone: '1234567890',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        role: 'super-admin',
        isAdmin: true,
        isApproved: true
      });
      
      await superAdmin.save();
      console.log('✅ Created super admin user: admin@whatcanistart.com (password: password)');
    } else {
      // Update existing admin to super-admin
      adminUser.role = 'super-admin';
      adminUser.isApproved = true;
      await adminUser.save();
      console.log(`✅ Updated existing admin (${adminUser.email}) to super-admin role`);
    }

    // Set default roles for users without roles
    const defaultRoleResult = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );

    console.log(`✅ Set default role 'user' for ${defaultRoleResult.modifiedCount} users`);

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

    console.log('\n✅ Super admin setup completed successfully!');

  } catch (error) {
    console.error('❌ Setup error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setSuperAdmin();
}

module.exports = setSuperAdmin;
