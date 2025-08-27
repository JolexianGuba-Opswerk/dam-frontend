// import React from "react";
// import { formatStatus, getStatusColor } from "../../utils/StatusBadge";

// const AssetDetailModal = ({ asset_id , isOpen, onClose }) => {
//     // request asset details from parent component or context

//   if (!isOpen || !asset) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-start mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Asset Details</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//               aria-label="Close modal"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
//               <p className="text-gray-800">{asset.name}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
//               <p className="text-gray-800">{asset.category}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Serial Number</label>
//               <p className="font-mono text-gray-800">{asset.serial_number}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
//               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
//                 {formatStatus(asset.status)}
//               </span>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
//               <p className="text-gray-800">{asset.description}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Asset ID</label>
//               <p className="text-gray-800">#{asset.id}</p>
//             </div>
//           </div>

//           <div className="mt-8 flex justify-end space-x-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Close
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
//               Request Maintenance
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetDetailModal;