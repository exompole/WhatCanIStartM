import { useEffect, useState } from "react";
import { adminAPI, approvalAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { FiBarChart2, FiUsers, FiCreditCard, FiMail, FiShield, FiPlus, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subAdmins, setSubAdmins] = useState([]);
  const [approvalRequests, setApprovalRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [userPlans, setUserPlans] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [contactSearch, setContactSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [modalUser, setModalUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateSubAdmin, setShowCreateSubAdmin] = useState(false);
  const [newSubAdminData, setNewSubAdminData] = useState({
    username: '',
    firstname: '',
    surname: '',
    email: '',
    phone: '',
    password: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [reviewModal, setReviewModal] = useState({ show: false, request: null });
  const [reviewData, setReviewData] = useState({ status: 'approved', comments: '' });

  // Get current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 5000);
  };

  // Derived filtered users
  const usersFiltered = users.filter(u =>
    (u.firstname + " " + u.surname).toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Use allSettled so a failure in one endpoint won't prevent others from resolving
        const results = await Promise.allSettled([
          adminAPI.getUsers(),
          adminAPI.getContacts(),
          adminAPI.getSubAdmins(),
          adminAPI.getAllApprovalRequests(),
          adminAPI.getPendingApprovalRequests()
        ]);

        const [usersResult, contactsResult, subAdminsResult, approvalRequestsResult, pendingRequestsResult] = results;

        if (usersResult.status === 'fulfilled') {
          setUsers(usersResult.value.data || []);
        } else {
          console.error('Failed to fetch users:', usersResult.reason);
          setUsers([]);
        }

        if (contactsResult.status === 'fulfilled') {
          setContacts(contactsResult.value.data || []);
        } else {
          console.warn('Failed to fetch contacts:', contactsResult.reason);
          setContacts([]);
        }

        if (subAdminsResult.status === 'fulfilled') {
          setSubAdmins(subAdminsResult.value.data || []);
        } else {
          console.warn('Failed to fetch sub-admins:', subAdminsResult.reason);
          setSubAdmins([]);
        }

        if (approvalRequestsResult.status === 'fulfilled') {
          setApprovalRequests(approvalRequestsResult.value.data || []);
        } else {
          console.warn('Failed to fetch approval requests:', approvalRequestsResult.reason);
          setApprovalRequests([]);
        }

        if (pendingRequestsResult.status === 'fulfilled') {
          setPendingRequests(pendingRequestsResult.value.data || []);
        } else {
          console.warn('Failed to fetch pending requests:', pendingRequestsResult.reason);
          setPendingRequests([]);
        }

        // Simulate userPlans fetch (replace with real API if available)
        setUserPlans([
          { userId: (usersResult.status === 'fulfilled' && usersResult.value.data[0])?.email, plans: ["Lemon Oil Extraction", "Organic Farming"] },
          { userId: (usersResult.status === 'fulfilled' && usersResult.value.data[1])?.email, plans: ["Agro Tourism"] },
        ]);
      } catch (error) {
        console.error('Unexpected error fetching admin dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Delete user handler
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminAPI.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleApprovePayment = async (userId) => {
    try {
      await adminAPI.approvePayment(userId);
      const updated = await adminAPI.getUsers();
      setUsers(updated.data);
      alert('Payment approved');
    } catch (err) {
      console.error(err);
      alert('Failed to approve payment');
    }
  };

  const handleSetSubscription = async (userId, plan) => {
    try {
      await adminAPI.setSubscription(userId, plan);
      const updated = await adminAPI.getUsers();
      setUsers(updated.data);
      alert('Subscription updated');
    } catch (err) {
      console.error(err);
      alert('Failed to update subscription');
    }
  };

  const handleCreateSubAdmin = async () => {
    try {
      if (!currentUser?._id) {
        showNotification('Current user not found', 'error');
        return;
      }
      
      await adminAPI.createSubAdmin(currentUser._id, newSubAdminData);
      const subAdminRes = await adminAPI.getSubAdmins();
      setSubAdmins(subAdminRes.data);
      setShowCreateSubAdmin(false);
      setNewSubAdminData({
        username: '',
        firstname: '',
        surname: '',
        email: '',
        phone: '',
        password: ''
      });
      showNotification('Sub admin created successfully. Pending approval from super admin.');
    } catch (err) {
      console.error(err);
      showNotification('Failed to create sub admin: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  const handleApproveSubAdmin = async (userId) => {
    try {
      if (!currentUser?._id) {
        showNotification('Current user not found', 'error');
        return;
      }
      
      await adminAPI.approveSubAdmin(userId, currentUser._id);
      const subAdminRes = await adminAPI.getSubAdmins();
      setSubAdmins(subAdminRes.data);
      showNotification('Sub admin approved successfully');
    } catch (err) {
      console.error(err);
      showNotification('Failed to approve sub admin: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      if (!currentUser?._id) {
        alert('Current user not found');
        return;
      }
      
      await adminAPI.updateUserRole(userId, newRole, currentUser._id);
      const userRes = await adminAPI.getUsers();
      setUsers(userRes.data);
      showNotification('User role updated successfully');
    } catch (err) {
      console.error(err);
      showNotification('Failed to update user role', 'error');
    }
  };

  // Approval request handlers
  const handleReviewRequest = async () => {
    try {
      if (!currentUser?._id || !reviewModal.request) {
        showNotification('Missing data for review', 'error');
        return;
      }

      await adminAPI.reviewApprovalRequest(reviewModal.request._id, {
        ...reviewData,
        reviewedBy: currentUser._id
      });

      // Refresh data
      const [approvalRequestsRes, pendingRequestsRes] = await Promise.all([
        adminAPI.getAllApprovalRequests(),
        adminAPI.getPendingApprovalRequests()
      ]);

      setApprovalRequests(approvalRequestsRes.data || []);
      setPendingRequests(pendingRequestsRes.data || []);
      
      setReviewModal({ show: false, request: null });
      setReviewData({ status: 'approved', comments: '' });
      showNotification(`Request ${reviewData.status} successfully`);
    } catch (err) {
      console.error('Review request error:', err);
      showNotification('Failed to review request', 'error');
    }
  };

  const openReviewModal = (request) => {
    setReviewModal({ show: true, request });
    setReviewData({ status: 'approved', comments: '' });
  };

  const closeReviewModal = () => {
    setReviewModal({ show: false, request: null });
    setReviewData({ status: 'approved', comments: '' });
  };

  const exportUsersCSV = () => {
    const headers = ["Name", "Email", "Role", "Subscription", "Plans"];
    const rows = usersFiltered.map(u => {
      const plansFor = (userPlans.find(up => up.userId === u.email)?.plans || []).join('; ');
      return [`${u.firstname} ${u.surname}`, u.email, u.role, u.subscription || 'Free', plansFor];
    });
    const csvContent = [headers, ...rows].map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const openUserModal = (user) => setModalUser(user);
  const closeUserModal = () => setModalUser(null);

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(usersFiltered.length / pageSize));
  const goToPage = (p) => setCurrentPage(Math.min(Math.max(1, p), totalPages));

  // Check if current user is super admin
  const isSuperAdmin = currentUser?.role === 'super-admin';
  const isAdmin = currentUser?.role === 'admin' || isSuperAdmin;

  // Debug information
  console.log('Admin Dashboard Debug:', {
    currentUser: currentUser?.email,
    userRole: currentUser?.role,
    isSuperAdmin,
    isAdmin,
    subAdminsCount: subAdmins.length,
    pendingApprovals: subAdmins.filter(sa => !sa.isApproved).length,
    selectedSection
  });

  if (loading) {
    return (
      <div className={styles.dashboardWrapper}>
        <div className={styles.loading}>Loading dashboard...</div>
      </div>
    );
  }

  return (
  <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, {currentUser?.firstname} {currentUser?.surname}</span>
          <span className={styles.userRole}>({currentUser?.role})</span>
        </div>
      </div>
      
      <div className={styles.columns}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Navigation</div>
          <nav className={styles.sidebarNav}>
            <button 
              className={`${styles.sidebarLink} ${selectedSection === 'dashboard' ? styles.active : ''}`}
              onClick={() => setSelectedSection('dashboard')}
            >
              <FiBarChart2 className={styles.sideIcon} /> Dashboard
            </button>
            
            <button 
              className={`${styles.sidebarLink} ${selectedSection === 'users' ? styles.active : ''}`}
              onClick={() => setSelectedSection('users')}
            >
              <FiUsers className={styles.sideIcon} /> Users
            </button>
            
            <button 
              className={`${styles.sidebarLink} ${selectedSection === 'payments' ? styles.active : ''}`}
              onClick={() => setSelectedSection('payments')}
            >
              <FiCreditCard className={styles.sideIcon} /> Payments
            </button>
            
            {isSuperAdmin && (
              <button 
                className={`${styles.sidebarLink} ${selectedSection === 'approval-requests' ? styles.active : ''}`}
                onClick={() => setSelectedSection('approval-requests')}
              >
                <FiClock className={styles.sideIcon} /> 
                Approval Requests
                {pendingRequests.length > 0 && (
                  <span className={styles.badge}>{pendingRequests.length}</span>
                )}
              </button>
            )}
            
            <button 
              className={`${styles.sidebarLink} ${selectedSection === 'contacts' ? styles.active : ''}`}
              onClick={() => setSelectedSection('contacts')}
            >
              <FiMail className={styles.sideIcon} /> Contacts
            </button>

            {isSuperAdmin && (
              <>
                <button 
                  className={`${styles.sidebarLink} ${selectedSection === 'sub-admins' ? styles.active : ''}`}
                  onClick={() => setSelectedSection('sub-admins')}
                >
                  <FiShield className={styles.sideIcon} /> Sub Admins
                </button>
              </>
            )}

            {/* Allow both admin and super-admin to create sub-admins */}
            {isAdmin && (
              <button 
                className={`${styles.sidebarLink} ${selectedSection === 'create-sub-admin' ? styles.active : ''}`}
                onClick={() => setSelectedSection('create-sub-admin')}
              >
                <FiPlus className={styles.sideIcon} /> Create Sub Admin
              </button>
            )}
          </nav>
        </aside>

        <main className={styles.mainContent}>
          {/* Dashboard Overview */}
          {selectedSection === 'dashboard' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Dashboard Overview</div>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}><FiUsers /></div>
                  <div className={styles.statLabel}>Total Users</div>
                  <div className={styles.statValue}>{users.length}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}><FiMail /></div>
                  <div className={styles.statLabel}>Contact Submissions</div>
                  <div className={styles.statValue}>{contacts.length}</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}><FiCreditCard /></div>
                  <div className={styles.statLabel}>Pending Payments</div>
                  <div className={styles.statValue}>{users.filter(u => u.paymentStatus === 'pending').length}</div>
                </div>
                {isSuperAdmin && (
                  <div className={styles.statBox}>
                    <div className={styles.statIcon}><FiShield /></div>
                    <div className={styles.statLabel}>Sub Admins</div>
                    <div className={styles.statValue}>{subAdmins.length}</div>
                  </div>
                )}
                
                {isSuperAdmin && subAdmins.filter(sa => !sa.isApproved).length > 0 && (
                  <div className={styles.statBox} style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                    <div className={styles.statIcon}><FiShield /></div>
                    <div className={styles.statLabel}>Pending Approvals</div>
                    <div className={styles.statValue}>{subAdmins.filter(sa => !sa.isApproved).length}</div>
                  </div>
                )}
              </div>
              
              {isSuperAdmin && subAdmins.filter(sa => !sa.isApproved).length > 0 && (
                <div className={styles.alertBox}>
                  <h4>⚠️ Pending Sub-Admin Approvals</h4>
                  <p>You have {subAdmins.filter(sa => !sa.isApproved).length} sub-admin(s) waiting for approval.</p>
                  <button 
                    className={styles.actionBtn}
                    onClick={() => setSelectedSection('sub-admins')}
                  >
                    Review Approvals
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Users Management */}
          {selectedSection === 'users' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>User Management</div>
              <div className={styles.sectionControls}>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className={styles.searchInput}
                />
                <button className={styles.actionBtn} onClick={exportUsersCSV}>Export CSV</button>
              </div>
              
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Subscription</th>
                    <th>Business Plans</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if (!usersFiltered.length) {
                      return (
                        <tr>
                          <td colSpan={6} style={{ textAlign: 'center', padding: 24 }}>
                            No users found. Try adjusting the search or create a new user.
                          </td>
                        </tr>
                      );
                    }
                    const start = (currentPage - 1) * pageSize;
                    const pageUsers = usersFiltered.slice(start, start + pageSize);
                    return pageUsers.map((user, idx) => (
                      <tr key={user._id || idx}>
                        <td>{user.firstname} {user.surname}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`${styles.roleBadge} ${styles[`role-${user.role}`]}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div className={styles.subscriptionInfo}>
                            <span className={styles.subscriptionPlan}>{user.subscription || 'Free'}</span>
                            <span className={styles.paymentStatus}>({user.paymentStatus || 'none'})</span>
                          </div>
                        </td>
                        <td>
                          {(userPlans.find(up => up.userId === user.email)?.plans || []).join(", ") || "-"}
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                          <button className={styles.actionBtn} onClick={() => openUserModal(user)}>View</button>
                          {user.paymentStatus === 'pending' && (
                            <button className={styles.actionBtn} onClick={() => handleApprovePayment(user._id)}>Approve Payment</button>
                          )}
                            {isSuperAdmin && user.role !== 'super-admin' && (
                              <select 
                                className={styles.roleSelect}
                                value={user.role}
                                onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                              >
                                <option value="user">User</option>
                                <option value="sub-admin">Sub Admin</option>
                                <option value="admin">Admin</option>
                              </select>
                            )}
                          </div>
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
              
              <div className={styles.paginationRow}>
                <button className={styles.actionBtn} onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                <div>Page {currentPage} / {totalPages}</div>
                <button className={styles.actionBtn} onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
              </div>
            </div>
          )}

          {/* Payment Approvals */}
          {selectedSection === 'payments' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Payment Approvals</div>
              <p>Users with pending payments requiring approval.</p>
              
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subscription</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.paymentStatus === 'pending').map((u, i) => (
                    <tr key={u._id || i}>
                      <td>{u.firstname} {u.surname}</td>
                      <td>{u.email}</td>
                      <td>{u.subscription || 'Free'}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                          {u.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button className={styles.actionBtn} onClick={() => handleApprovePayment(u._id)}>Approve</button>
                        <button className={styles.actionBtn} onClick={() => openUserModal(u)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contact Submissions */}
          {selectedSection === 'contacts' && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Contact Submissions</div>
              <div className={styles.sectionControls}>
                <input
                  type="text"
                  placeholder="Search contacts by name, email, or message..."
                  value={contactSearch}
                  onChange={e => setContactSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.filter(c =>
                    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                    c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
                    c.message.toLowerCase().includes(contactSearch.toLowerCase())
                  ).map((c, idx) => (
                    <tr key={c._id || idx}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td className={styles.messageCell}>{c.message}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Sub Admins Management (Super Admin Only) */}
          {selectedSection === 'sub-admins' && isSuperAdmin && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Sub Admin Management</div>
              
              {subAdmins.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No sub-admins found. Create a new sub-admin to get started.</p>
            </div>
              ) : (
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
                      <th>Status</th>
                      <th>Created By</th>
                      <th>Approved By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                    {subAdmins.map((subAdmin, i) => (
                      <tr key={subAdmin._id || i}>
                        <td>{subAdmin.firstname} {subAdmin.surname}</td>
                        <td>{subAdmin.email}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${subAdmin.isApproved ? styles.statusApproved : styles.statusPending}`}>
                            {subAdmin.isApproved ? 'Approved' : 'Pending Approval'}
                          </span>
                  </td>
                        <td>{subAdmin.createdBy ? `${subAdmin.createdBy.firstname} ${subAdmin.createdBy.surname}` : '-'}</td>
                        <td>{subAdmin.approvedBy ? `${subAdmin.approvedBy.firstname} ${subAdmin.approvedBy.surname}` : '-'}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            {!subAdmin.isApproved && (
                              <button 
                                className={styles.actionBtn} 
                                onClick={() => handleApproveSubAdmin(subAdmin._id)}
                                style={{ backgroundColor: '#10b981' }}
                              >
                                Approve
                              </button>
                            )}
                            <button className={styles.actionBtn} onClick={() => openUserModal(subAdmin)}>View Details</button>
                    </div>
                  </td>
                </tr>
                    ))}
          </tbody>
        </table>
              )}
            </div>
          )}

          {/* Create Sub Admin (Admin and Super Admin) */}
          {selectedSection === 'create-sub-admin' && isAdmin && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Create New Sub Admin</div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Username *</label>
                  <input
                    type="text"
                    value={newSubAdminData.username}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, username: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={newSubAdminData.firstname}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, firstname: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={newSubAdminData.surname}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, surname: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter last name"
                    required
                  />
        </div>
                
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    value={newSubAdminData.email}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, email: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter email address"
                    required
                  />
      </div>

                <div className={styles.formGroup}>
                  <label>Phone</label>
          <input
            type="text"
                    value={newSubAdminData.phone}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, phone: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Password *</label>
                  <input
                    type="password"
                    value={newSubAdminData.password}
                    onChange={(e) => setNewSubAdminData({...newSubAdminData, password: e.target.value})}
                    className={styles.formInput}
                    placeholder="Enter password"
                    required
          />
        </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  className={styles.actionBtn} 
                  onClick={handleCreateSubAdmin}
                  disabled={!newSubAdminData.username || !newSubAdminData.firstname || !newSubAdminData.surname || !newSubAdminData.email || !newSubAdminData.password}
                >
                  Create Sub Admin
                </button>
                <button 
                  className={styles.secondaryBtn} 
                  onClick={() => setNewSubAdminData({
                    username: '', firstname: '', surname: '', email: '', phone: '', password: ''
                  })}
                >
                  Clear Form
                </button>
              </div>
              
              <div className={styles.infoBox}>
                <p><strong>Note:</strong> New sub-admins will require approval from a super admin before they can access the dashboard.</p>
              </div>
            </div>
          )}

          {/* Approval Requests Section (Super Admin Only) */}
          {selectedSection === 'approval-requests' && isSuperAdmin && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Approval Requests</div>
              
              {approvalRequests.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No approval requests found.</p>
                </div>
              ) : (
                <div className={styles.requestsContainer}>
                  {approvalRequests.map((request, index) => (
                    <div key={request._id || index} className={styles.requestCard}>
                      <div className={styles.requestHeader}>
                        <div className={styles.requestInfo}>
                          <h4>{request.actionType.replace('_', ' ').toUpperCase()}</h4>
                          <p><strong>Requested by:</strong> {request.requestedBy?.firstname} {request.requestedBy?.surname}</p>
                          <p><strong>Target:</strong> {request.targetUser ? `${request.targetUser.firstname} ${request.targetUser.surname}` : 'N/A'}</p>
                          <p><strong>Details:</strong> {request.requestDetails}</p>
                          <p><strong>Priority:</strong> 
                            <span className={`${styles.priorityBadge} ${styles[`priority-${request.priority}`]}`}>
                              {request.priority}
                            </span>
                          </p>
                        </div>
                        <div className={styles.requestStatus}>
                          <span className={`${styles.statusBadge} ${styles[`status-${request.status}`]}`}>
                            {request.status === 'pending' && <FiClock className={styles.statusIcon} />}
                            {request.status === 'approved' && <FiCheckCircle className={styles.statusIcon} />}
                            {request.status === 'rejected' && <FiXCircle className={styles.statusIcon} />}
                            {request.status}
                          </span>
                        </div>
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className={styles.requestActions}>
                          <button 
                            className={styles.actionBtn}
                            onClick={() => openReviewModal(request)}
                            style={{ backgroundColor: '#10b981' }}
                          >
                            Review Request
                          </button>
                        </div>
                      )}
                      
                      {request.status !== 'pending' && request.reviewComments && (
                        <div className={styles.reviewComments}>
                          <p><strong>Review Comments:</strong> {request.reviewComments}</p>
                          <p><strong>Reviewed by:</strong> {request.reviewedBy?.firstname} {request.reviewedBy?.surname}</p>
                          <p><strong>Reviewed at:</strong> {new Date(request.reviewedAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`${styles.notification} ${styles[`notification-${notification.type}`]}`}>
          <span>{notification.message}</span>
          <button 
            className={styles.notificationClose}
            onClick={() => setNotification({ show: false, message: '', type: 'success' })}
          >
            ×
          </button>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal.show && (
        <div className={styles.modalBackdrop} onClick={closeReviewModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3>Review Approval Request</h3>
            <div className={styles.modalContent}>
              <div className={styles.formGroup}>
                <label>Action Type:</label>
                <p>{reviewModal.request?.actionType?.replace('_', ' ').toUpperCase()}</p>
              </div>
              
              <div className={styles.formGroup}>
                <label>Request Details:</label>
                <p>{reviewModal.request?.requestDetails}</p>
              </div>
              
              <div className={styles.formGroup}>
                <label>Status:</label>
                <select 
                  value={reviewData.status} 
                  onChange={(e) => setReviewData({...reviewData, status: e.target.value})}
                  className={styles.formInput}
                >
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Comments:</label>
                <textarea 
                  value={reviewData.comments} 
                  onChange={(e) => setReviewData({...reviewData, comments: e.target.value})}
                  className={styles.formInput}
                  placeholder="Add review comments..."
                  rows="3"
                />
              </div>
              
              <div className={styles.modalActions}>
                <button className={styles.actionBtn} onClick={handleReviewRequest}>
                  Submit Review
                </button>
                <button className={styles.secondaryBtn} onClick={closeReviewModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
      </div>
      )}

      {/* User Detail Modal */}
      {modalUser && (
        <div className={styles.modalBackdrop} onClick={closeUserModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <h3>{modalUser.firstname} {modalUser.surname}</h3>
            <div className={styles.modalContent}>
            <p><strong>Email:</strong> {modalUser.email}</p>
            <p><strong>Phone:</strong> {modalUser.phone || '-'}</p>
              <p><strong>Role:</strong> 
                <span className={`${styles.roleBadge} ${styles[`role-${modalUser.role}`]}`}>
                  {modalUser.role}
                </span>
              </p>
            <p><strong>Subscription:</strong> {modalUser.subscription || 'Free'}</p>
              <p><strong>Payment Status:</strong> 
                <span className={`${styles.statusBadge} ${styles[`status-${modalUser.paymentStatus}`]}`}>
                  {modalUser.paymentStatus || 'none'}
                </span>
              </p>
              
              {modalUser.role === 'sub-admin' && (
                <>
                  <p><strong>Approval Status:</strong> 
                    <span className={`${styles.statusBadge} ${modalUser.isApproved ? styles.statusApproved : styles.statusPending}`}>
                      {modalUser.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </p>
                  {modalUser.approvedBy && (
                    <p><strong>Approved By:</strong> {modalUser.approvedBy.firstname} {modalUser.approvedBy.surname}</p>
                  )}
                </>
              )}
            </div>
            
            <div className={styles.modalActions}>
              {modalUser.paymentStatus === 'pending' && (
                <button className={styles.actionBtn} onClick={() => { handleApprovePayment(modalUser._id); closeUserModal(); }}>
                  Approve Payment
                </button>
              )}
              <button className={styles.actionBtn} onClick={() => { handleSetSubscription(modalUser._id, 'Basic'); closeUserModal(); }}>
                Set Basic
              </button>
              <button className={styles.actionBtn} onClick={() => { handleSetSubscription(modalUser._id, 'Pro'); closeUserModal(); }}>
                Set Pro
              </button>
              <button className={styles.actionBtn} onClick={() => { handleSetSubscription(modalUser._id, 'Free'); closeUserModal(); }}>
                Set Free
              </button>
              <button className={styles.secondaryBtn} onClick={closeUserModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
