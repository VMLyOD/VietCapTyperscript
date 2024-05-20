import { ReactNode } from 'react';
// import { ToastOptions, toast } from 'react-toastify';


const options = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  closeButton: false,
  theme: "dark"
};




export const buildClassName = (...array: Array<string | undefined>)=>{
  return array?.filter(item=>!!item)?.join(' ');
}

export const dropClassName = (...array: Array<string | undefined>)=>{
  return array?.filter(item=>!!item)?.join(' ');
}

// export const toastError = (msg: string | ReactNode) => {
//   toast.error(msg, {
//     ...options,
//     ...config,
//     className: 'toast-container',
//     // icon: customIcon(Type.error)
//   });
// };

export const AG_GRID_KEY = '[TRIAL]__[v2]_MTg1OTE1NTIwMDAwMA==587eda6099b3cd6314f54cae267007c4';

