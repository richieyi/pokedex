import { Pokemon, Type } from 'pokemon-types';
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface SelectedPokemonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedPokemon: Pokemon;
}

function SelectedPokemon(props: SelectedPokemonProps) {
  const {
    selectedPokemon: { id, name, sprites, stats, types },
    isOpen,
    setIsOpen,
  } = props;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col items-center">
                      <p>{`#${id}. ${name}`}</p>
                      <img
                        src={sprites.front_default}
                        width="96"
                        height="96"
                      />
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div>
                        <p>
                          Stats:{' '}
                          <span>
                            {`${stats?.[0]?.base_stat} ${stats?.[0]?.stat.name}`}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>
                          Types:{' '}
                          {types.map(({ type }: Type, idx) => (
                            <span key={type.name}>{`${type.name}${
                              idx !== types.length - 1 ? ', ' : ''
                            }`}</span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default SelectedPokemon;
