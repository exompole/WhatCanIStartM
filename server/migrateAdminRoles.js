const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whatcanistart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const migrateAdminRoles = async () => {
  try {
    console.log('Starting admin role migration...');
    
    // Find all users with isAdmin: true and update them to role: 'admin'
    const result = await User.updateMany(
      { isAdmin: true, role: { $exists: false } },
      { 
        $set: { 
          role: 'admin',
          isApproved: true 
        } 
      }
    );
    
    console.log(`Updated ${result.modifiedCount} admin users to role: 'admin'`);
    
    // Find the super admin (assuming it's the one with ADMIN_EMAIL)
    const superAdminEmail = process.env.ADMIN_EMAIL;
    if (superAdminEmail) {
      const superAdminResult = await User.updateOne(
        { email: superAdminEmail },
        { 
          $set: { 
            role: 'super-admin',
            isApproved: true 
          } 
        }
      );
      
      if (superAdminResult.modifiedCount > 0) {
        console.log(`Updated super admin (${superAdminEmail}) to role: 'super-admin'`);
      }
    }
    
    // Set default role for users without a role
    const defaultRoleResult = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );
    
    console.log(`Set default role 'user' for ${defaultRoleResult.modifiedCount} users`);
    
    console.log('Admin role migration completed successfully!');
    
  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  migrateAdminRoles();
}

module.exports = migrateAdminRoles;
