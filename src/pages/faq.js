import { useEffect, useState } from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is LIB?",
    answer:
      "LIB is the native utility coin of the Liberdus network, used for transaction fees, governance, staking and ecosystem incentives. It can also be bridged to the Polygon network to be used as an ERC-20 token and is divisible to 18 decimal places.",
  },
  {
    question: "What is the total supply of LIB tokens?",
    answer:
      "The maximum supply of LIB tokens is fixed at 210 million. However, due to continuous burning mechanisms, the actual circulating supply will likely be lower.",
  },
    {
    question: "What is a “capped elastic supply model”?",
    answer:
      "The LIB token uses a capped elastic supply model, meaning the supply can be inflationary, disinflationary, or deflationary based on network conditions and macroeconomic factors. This ensures that the token supply adjusts dynamically while remaining within the hard cap.",
  },
    {
    question: "What is the utility of LIB?",
    answer: (
      <>
        Information on the utility of LIB can be found{" "}
        <a href="/tokenomics" className="text-blue-500 underline">
          here
        </a>.
      </>
    ),
  },
    {
    question: "How is LIB scarce?",
    answer: (
      <>
        This information can be found{" "}
        <a href="/tokenomics" className="text-blue-500 underline">
          here
        </a>.
      </>
    ),
  },
  {
    question: "What is staking?",
    answer:
      "There are two main types: validator staking and liquidity staking. Validator staking means directly staking LIB tokens to run or support a validator node, helping to validate transactions and maintain network integrity. In return, participants earn staking rewards. Liquidity staking allows users to stake LIB without running a validator themselves. This provides flexibility and liquidity, often allowing staked tokens to be used in other DeFi activities while still earning rewards.",
  },
  {
    question: "How do I stake LIB?",
    answer:
      "Users can stake LIB through the Liberdus network’s staking mechanism. More details on the staking process will be provided when the staking feature is live.",
  },
  {
    question: "How much can I earn by staking?",
    answer:
      "Staking rewards depend on multiple factors, including network activity and token issuance schedules. A specific APY (Annual Percentage Yield) will be determined based on network conditions.",
  },
  {
    question: "What happens to transaction fees in Liberdus?",
    answer:
      "All transaction fees paid in LIB are burnt and permanently removed from circulation. This contributes to LIB’s deflationary mechanics.",
  },
  {
    question: "Are all LIB tokens eventually burnt?",
     answer: (
      <>
        Not all LIB tokens are burnt, but multiple burning mechanisms continuously reduce the circulating supply. These include:
        <ul className="list-disc ml-5 mt-2">
          <li>Transaction fee burning</li>
          <li>Slashing penalties for misbehaving validators</li>
          <li>Governance-related burns (voting)</li>
          <li>Potential other forms of ecosystem-driven burning</li>
        </ul>
      </>
    ),
  },
  {
    question: "What is slashing, and how does it work?",
    answer:
      "Slashing is a penalty imposed on validators who engage in malicious or negligent behavior, such as double-signing transactions or going offline for extended periods. Slashed LIB tokens are burnt, reinforcing the token’s deflationary aspect.",
  },
    {
    question: "What are Standby Nodes?",
    answer:
      "Nodes that are waiting to become active nodes when the network rotates them in but are not actively participating in consensus.",
  },
   {
    question: "What is the S:A Ratio?",
    answer:
      "The standby node to active node ratio on Liberdus. 100 standby nodes with 100 active nodes would, for instance, be a 1:1 ratio, whereas 200 standby nodes and 100 active nodes would be 2:1.",
  },
     {
    question: "What is the LDAO?",
    answer:
      "The Liberdus DAO is the decentralized organization that governs the Liberdus network once the mainnet is live. It controls the development fund, sets economic parameters, and approves proposals that shape network operations and future improvements. Essentially, LDAO empowers LIB coin holders to participate in decision-making, ensuring the platform evolves in a transparent, community-driven way.",
  },
  {
    question: "How does governance work in Liberdus?",
    answer:
      "LIB holders can participate in network governance by voting on proposals. Liberdus employs a ”1 token, 1 burn” model, meaning that tokens used for voting are permanently burnt.",
  },
  {
    question: "Do I have to vote?",
    answer:
      "Voting is optional, but it allows LIB holders to influence network decisions.",
  },
  {
    question: "Why would I burn my tokens to vote?",
    answer:
      "Burning tokens for voting helps ensure that only committed stakeholders participate in governance. This mechanism prevents vote manipulation by making voting an economic decision.",
  },
  {
    question: "Who designed Liberdus’s monetary policy?",
    answer:
      "Liberdus’s tokenomics were designed by the same team that structured Shardeum’s SHM tokenomics, focusing on stability, predictability, adaptability, and scarcity.",
  },
  {
    question: "Why does Liberdus need a distinct issuance model?",
    answer:
      "Unlike traditional blockchain networks, Liberdus horizontally scales, meaning new nodes can be added to increase capacity. This requires an adaptive issuance model to ensure that token rewards remain stable and sustainable.",
  },
  {
    question: "What is disinflation, and how does it impact LIB?",
    answer:
      "Disinflation refers to a gradual reduction in the rate of token issuance over time. LIB’s issuance model follows a scaling-friendly disinflation model, where the token rewards gradually decrease, similar to Bitcoin’s halving cycle or Solana’s declining issuance rate.",
  },
  {
    question: "What does “supply equilibrium” mean?",
    answer:
      "Supply equilibrium is a state where the rate of new token issuance is balanced by the rate of burn through transaction fees, voting and other mechanisms. The supply rate aligns with network demand and economic conditions, preventing excessive inflation or deflation.",
  },
  {
    question: "What is the token distribution for LIB?",
     answer: (
      <>
        The token distribution for LIB can be found{" "}
        <a href="/tokenomics/#/emissions" className="text-blue-500 underline">
          here
        </a>.
      </>
    ),
  },
  {
    question: "What constitutes a contribution to receive LIB?",
    answer:
      "Contributions include development, security research, protocol improvements, community engagement, and other ecosystem-building activities.",
  },
  {
    question: "Why are there two categories for operating expenses?",
    answer:
      "One category is general operating expenses (10%) for business functions, while the 30% allocated to network operations covers incentives for validators, stakers, and liquidity providers.",
  },
  {
    question: "How does LIB’s issuance model compare to other networks?",
    answer:
      "Bitcoin: Fixed issuance with a halving event every ~4 years. Solana: Annual 1.5% disinflation rate. Algorand: Fixed periodic mints. Liberdus: Adaptive issuance model that adjusts token supply based on network conditions.",
  },
  {
    question: "Why does Liberdus need an adaptive issuance model?",
    answer:
      "Horizontally scaling networks require an issuance model that prevents extreme APY fluctuations. Without adjustments, rewards in bull markets could become excessive, and in bear markets, low token values could make node operations unprofitable.",
  },
    {
    question: "How will Liberdus ensure validator profitability in volatile markets?",
    answer:
      "The adaptive monetary policy adjusts token issuance based on network conditions, ensuring validators receive sustainable rewards without overinflation.",
  },
    {
    question: "What is meant by “ultra-deflationary”?",
    answer:
      "If token burning outpaces issuance, LIB could enter an “ultra-deflationary” phase where supply continually decreases, making it more scarce.",
  },
    {
    question: "Why is scarcity significant for LIB?",
    answer:
      "Scarcity can increase token value and enhance economic security. However, an adaptive issuance model prevents extreme shortages that could hinder network participation.",
  },
    {
    question: "Why doesn’t LIB have named fractional units like Ethereum’s wei or gwei?",
    answer:
      "Currently, all denominations are simply referred to as LIB. However, the network remains open to adopting unique names for fractional units in the future.",
  },
    {
    question: "What role does LIB play in messaging transactions?",
    answer:
      "LIB is used to pay transaction fees for messages and token transfers. Users can also set tolls to require payments before receiving messages, an anti-spam mechanism.",
  },
    
]

export default function FAQ() {
  const [currentHash, setCurrentHash] = useState('');

  // Extract just the final hash (e.g., #faq-10 from #/faq#faq-10)
  useEffect(() => {
    const extractAnchor = () => {
      const hash = window.location.hash;
      const parts = hash.split('#');
      if (parts.length > 2) {
        setCurrentHash(`#${parts[2]}`); // e.g., "#faq-10"
      } else if (parts.length === 2 && parts[1].startsWith('faq-')) {
        setCurrentHash(`#${parts[1]}`);
      } else {
        setCurrentHash('');
      }
    };

    extractAnchor(); // on mount
    window.addEventListener('hashchange', extractAnchor);
    return () => window.removeEventListener('hashchange', extractAnchor);
  }, []);

  useEffect(() => {
    if (currentHash) {
      const element = document.getElementById(currentHash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for render
      }
    }
  }, [currentHash]);

  return (
    <div className="bg-white">
      <div className="mx-auto py-4 lg:py-0 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y-4 divide-purple">
          <h2 className="text-4xl font-semibold tracking-tight text-purple sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-purple">
            {faqs.map((faq, index) => {
              const faqId = `faq-${index}`;
              const isOpen = currentHash === `#${faqId}`;

              return (
                <Disclosure key={`${faqId}-${currentHash}`} defaultOpen={isOpen} as="div" className="pt-6">
                  <dt id={faqId} className="scroll-mt-24">
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base/7 font-semibold">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden" />
                        <MinusSmallIcon aria-hidden="true" className="size-6 group-[&:not([data-open])]:hidden" />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    {typeof faq.answer === 'string' ? (
                      <p className="text-base/7 text-gray-600">{faq.answer}</p>
                    ) : (
                      faq.answer
                    )}
                  </DisclosurePanel>
                </Disclosure>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
