// Modal.tsx
import React, { ReactNode } from 'react';
import '../styles/Modal.css';

// const Modal = ({ isOpen, onClose, children, matchId }: { isOpen: boolean, onClose: () => void, children: ReactNode, matchId: string }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="modal-overlay" >
//             <div className="modal-content" >
//                 {children}
//             </div>
//         </div>
//     );
// };
const Modal = ({ isOpen, onClose, children, matchId }: { isOpen: boolean, onClose: () => void, children: ReactNode, matchId: string }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" >
            <div className="modal-content" >
                {children}
            </div>
        </div>
    );
};

export default Modal;