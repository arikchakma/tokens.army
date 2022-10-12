import * as Tooltip from '@radix-ui/react-tooltip';
import { LinkIcon } from '@heroicons/react/24/outline';

export default function EtherscanLink({ address }: { address: string }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="group flex h-7 min-w-[28px] items-center justify-center transition-all duration-100 ease-in-out hover:bg-gray-200/60">
              <LinkIcon className="h-4 w-4 stroke-2 text-gray-600 transition-all duration-100 ease-in-out group-hover:text-gray-700" />
            </div>
          </a>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" sideOffset={5} align="start">
            <p className="rounded-lg bg-gray-200/40 p-2 text-[10px] font-medium leading-none text-gray-600 ring-1 ring-gray-200">
              Explore on Etherscan
            </p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
