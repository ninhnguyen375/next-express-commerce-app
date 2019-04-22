import Axios from 'axios';

const checkAdmin = async () => {
  const admin = JSON.parse(window.sessionStorage.getItem('adminPageAccess'));

  if (!admin || !admin.admin_key || !admin.admin_name) {
    return false;
  }

  const res = await Axios.get(`/api/users/${admin.admin_key}/adminPermission`);

  if (res.data.err) {
    return false;
  }

  return true;
};

export default checkAdmin;
