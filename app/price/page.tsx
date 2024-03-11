'use client';
import React from 'react';
import { FaNairaSign } from 'react-icons/fa6';

// interface PriceModalProps {
//     usd: string;
//     rate: number;
    
// }

const PriceModal = ({ usd, rate}: any) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()}>
        Convert to USD
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">The current rate is at {rate} naira to 1 dollar</h3>
          <p className="py-4 "> The dollar equivalent is  <span className='text-xl font-bold'>$ {usd}</span></p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).close()}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PriceModal;

