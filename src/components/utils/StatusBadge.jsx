export const formatStatus = (status) => {
    const statusMap = {
      'IN_USE': 'In Use',
      'AVAILABLE': 'Available',
      'MAINTENANCE': 'Maintenance',
      'RETIRED': 'Retired'
    };
    return statusMap[status] || status;
  };

export const getStatusColor = (status) => {
    const colorMap = {
      'IN_USE': 'bg-green-100 text-green-800',
      'AVAILABLE': 'bg-blue-100 text-blue-800',
      'MAINTENANCE': 'bg-yellow-100 text-yellow-800',
      'RETIRED': 'bg-gray-100 text-gray-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };
  