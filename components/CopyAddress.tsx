import { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ClipboardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CopyAddress({ address }: { address: string }) {
  const [mounted, setMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    let timeout: NodeJS.Timeout;

    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [mounted, isCopied]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>
          {mounted ? (
            <CopyToClipboard text={address} onCopy={() => setIsCopied(true)}>
              <div className="group flex h-7 min-w-[28px] items-center justify-center transition-all duration-100 ease-in-out hover:bg-gray-200/60">
                {!isCopied && (
                  <ClipboardIcon className="h-4 w-4 stroke-2 text-gray-600 transition-all duration-100 ease-in-out group-hover:text-gray-700" />
                )}
                {isCopied && (
                  <CheckCircleIcon className="h-4 w-4 stroke-2 text-gray-600 transition-all duration-100 ease-in-out group-hover:text-gray-700" />
                )}
              </div>
            </CopyToClipboard>
          ) : (
            <div className="group flex h-7 min-w-[28px] items-center justify-center transition-all duration-100 ease-in-out hover:bg-gray-200/60">
              <ClipboardIcon className="h-4 w-4 stroke-2 text-gray-600 transition-all duration-100 ease-in-out group-hover:text-gray-700" />
            </div>
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={5}>
            <p className="rounded-lg bg-gray-200/40 p-2 text-[10px] font-medium leading-none text-gray-600 ring-1 ring-gray-200">
              Copy Address
            </p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
