// App.js
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useState} from "react";
import {EmmisionsData} from '../components/data/EmmisionsData.js';
import {DistributionData} from '../components/data/DistributionData.js';
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors);

Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;

export default function Emissions() {
  const [chartData] = useState({
    labels: EmmisionsData.map((data) => data.Day),
    datasets: [
      {
        label: "Liquid LIB",
        data: EmmisionsData.map((data) => data.TotalLiquid_LIB)
      },
      {
        label: "Direct Contributors",
        data: EmmisionsData.map((data) => data.Direct_Contributors)
      },
      {
        label: "Operating Expenses",
        data: EmmisionsData.map((data) => data.Operating_Expenses)
      },
      {
        label: "Shardus Token Holders",
        data: EmmisionsData.map((data) => data.Distributed_Shardus_Holders)
      },
      {
        label: "Other Communities",
        data: EmmisionsData.map((data) => data.Other_Communities)
      }
    ]
  });

  const [chartData2] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued LIB - Tokens",
        data: DistributionData.map((data) => data.SHM)
      }
    ]
  });

  const [chartData3] = useState({
    labels: DistributionData.map((data) => data.Distribution),
    datasets: [
      {
        label: "Issued LIB - Tokens",
        data: DistributionData.map((data) => data.SHM)
      }
    ]
  });

  return (

<div className="bg-white">
  <div className="mx-auto max-w-7xl lg:px-8">
    <div className="mx-auto mt-6 max-w-2xl lg:mx-0 lg:max-w-none lg:mt-0">
      <h1 className="text-2xl font-semibold text-purple">Liberdus Emissions</h1>

      {/* LIB Coin Fundamentals - Full Width H2 */}
      <div className="mt-10 max-w-xl lg:max-w-none border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">
        {/* H2 Spanning Both Columns */}
        <h2 className="text-xl font-semibold text-purple w-full mb-4">Liberdus Distribution</h2>

        {/* Add items-stretch to ensure grid items match height */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 items-stretch text-base/7 text-lightGrey">
          {/* Left Column */}
          <div>
            <p className="mt-4 mb-4">
              Max Supply: <span className="font-semibold">210M coins</span>
            </p>
            <p className="font-semibold">Distribution:</p>

            <ul className="list-disc space-y-2 list-inside">
              <li>
                <span className="font-semibold">25%</span> – Direct contributors over 2 years (max 2M minted each 4 weeks period).
              </li>
              <li>
                <span className="font-semibold">10%</span> – Operating expenses over 2 years (max 1M minted each period; expenses paid using current market rate via a 3rd party exchange for vendors that don't accept LIB).
                <p className="mt-2">
                  Half of the unused supply during each period is allocated to liquidity providers and the other half to client users and node operators (verified on LinkedIn.com to prevent multiple claims).
                </p>
              </li>
              <li>
                <span className="font-semibold">10%</span> – To Shardus token holders (ULT) (created when needed by <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> after mainnet; distributed over 2 years with multiple claim events).
              </li>
            </ul>
          </div>
          {/* End Left Column */}

          {/* Right Column */}
          <div className="lg:mt-16">
            <ul className="list-disc space-y-2 list-inside">
              <li>
                <span className="font-semibold">25%</span> – To other communities (created when needed by <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> after mainnet; distributed over 2 years; claim events occur over 2 years and are verified on x.com to prevent multiple claims).
              </li>
              <li>
                <span className="font-semibold">30%</span> – Network operation expenses (node_rewards + monthly_expenses). Minted as needed to reward node operators, liquidity providers, fund development, and expenses.
                <p className="mt-2">
                  All creation and use of minted coins must be approved by the <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a>. Coins burned by tx_fees, penalties, and voting are added to this pool, and unused amounts from other items will be added to this pool.
                </p>
              </li>
            </ul>
              <p className="mt-2">
        <span className="font-semibold">Note:</span> The max supply will never be reached as governance voting and transaction fees continuously burn tokens.
      </p>
          </div>
          {/* End Right Column */}
        </div>



      {/* 2-column layout for BarChart and PieChart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <BarChart plugins={[ChartDataLabels, Colors]} chartData={chartData2} />
        <PieChart plugins={[ChartDataLabels]} chartData={chartData3} />
  

     
    </div>
        {/* End Grid Container */}
      </div>
      {/* End LIB Coin Fundamentals Container */}

    </div>

    {/* End Inner Container */}
  </div>
  {/* End Max-width Container */}


{/* Liberdus Distribution Pre-Mainnet */}
<div className="mt-10 max-w-xl lg:max-w-none border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">
  {/* H2 Spanning Both Columns */}
  <h2 className="text-xl font-semibold text-purple w-full mb-4">Liberdus Distribution Pre-Mainnet</h2>

  {/* Two Columns Layout */}
  <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 items-stretch text-base/7 text-lightGrey">
    
    {/* Left Column */}
    <div>
      <h3 className="text-lg font-semibold mt-4">Project Overview and Contributor Terms</h3>
      <p className="mt-2 mb-4">
        During the pre‐mainnet phase, the Liberdus project operates as an open-source initiative hosted on GitHub. Anyone can join the project as a contributor, provided they accept the contributor terms. These terms ensure that contributors will not later claim intellectual property rights over their work, that they contribute only original content, and that they are not bound by external contracts that might restrict their participation.
      </p>
      
      <h3 className="text-lg font-semibold mt-4">Committer Roles and Governance</h3>
      <p className="mt-2 mb-4">
        A group of 4 to 10 committers will be responsible for maintaining the repositories and approving pull requests. During this phase, the committers vote on the project's direction, while after mainnet launch, the <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> will take over decision-making, with committers assisting in executing those decisions.
      </p>
      
      <h3 className="text-lg font-semibold mt-4">Transparency and OTC Smart Contract</h3>
      <p className="mt-2 mb-4">
        To maintain transparency and accountability, committers must track the number of hours they work on the project over each four-week period and submit detailed reports for review by their peers. A summary of these reports is made publicly available. Additionally, a simple OTC smart contract will be set up to facilitate token transactions, allowing sellers to list their tokens at a desired price and buyers to bid with a stablecoin, with one party making a market buy to complete the transaction.
      </p>
      
      <h3 className="text-lg font-semibold mt-4">Contributor Token Distribution</h3>
      <p className="mt-2">
        Token distribution to contributors is designed to reward actual work. Each period, 2 million tokens are minted and allocated proportionally to the total hours worked. Initially, a fixed token amount model is used until tokens begin trading on AMMs and a market price emerges. Later, a variable market rate model is implemented, capped by the original fixed model, where the tokens-per-hour rate is normalized against a baseline of 60 dollars per hour.
      </p>
    </div>
    {/* End Left Column */}

    {/* Right Column */}
    <div>
      <h3 className="text-lg font-semibold mt-4">Vendor Token Distribution</h3>
      <p className="mt-2 mb-4">
        Vendors receive tokens from a separate pool, with 1 million tokens created each period to cover expenses. When a vendor bill is paid, the payer receives tokens based on the current token price on an AMM relative to a USD stablecoin, sometimes with a small convenience fee added (for example, receiving $103 in tokens for a $100 bill if a 3% fee applies). Vendors who do not accept Liberdus tokens directly and require USD are paid through an intermediary exchanger that typically charges about a 5% fee.
      </p>
      
      <h3 className="text-lg font-semibold mt-4">Resource Provider Distribution</h3>
      <p className="mt-2">
        Any tokens remaining from the expense pool are distributed to resource providers. Half of these tokens are allocated to liquidity providers who help establish a market for the Liberdus token on AMMs, while the other half are shared between node operators and active users of the Liberdus client. This distribution occurs through a periodic claim event, during which each claiming address must verify their participation by posting a tweet from a verified x.com account.
      </p>
    </div>
    {/* End Right Column */}
    

</div>



  </div>
<div className="mt-10 max-w-xl lg:max-w-none border-l-4 border-purple py-4 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-6">
    {/* H2 Spanning Both Columns */}
        <h2 className="text-xl font-semibold text-purple w-full my-4">Liberdus Emissions Post-Mainnet</h2>

        {/* Full-Width Introductory Content */}
  <p className="my-4">
    After the mainnet launch, the Liberdus ERC20 tokens on Polygon will continue to exist, and a bridging mechanism will allow these tokens to be converted into coins on the mainnet, and vice versa. On mainnet, node operators are rewarded with newly minted coins. The <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> also retains the authority to vote on proposals to mint coins for other purposes, such as development and maintenance of the Liberdus and Shardus codebases, providing liquidity for LIB on AMMs, covering operational expenses like servers, marketing efforts to raise awareness of Liberdus, and ecosystem grants for building additional services and software.
    </p>

{/* Add items-stretch to ensure grid items match height */}
<div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 items-stretch text-base/7 text-lightGrey">
  {/* Left Column */}
  <div>
    <ul className="list-disc space-y-2 list-inside">
      <li>
        <span className="font-semibold">Direct Contributors</span> – After mainnet launch 2 million LIB will continue to be created each 4 week period until the total spent for direct contributors reaches 52.5 million.
      </li>
      <li>
        <span className="font-semibold">Operating Expenses</span> – After mainnet launch 1 million LIB will continue to be created each 4 week period  until the total spent for operating expenses reaches 21 million.
      </li>
      <li>
        <span className="font-semibold">Shardus Token Holders</span> – Coins for Shardus Token Holders will be issued during multiple claim events over two years. Since the exact timing of these events is not predetermined, a linear distribution (a fixed amount issued per day) will be used until a maximum of 21 million coins is reached.
      </li>
    </ul>
  </div>
  {/* End Left Column */}

  {/* Right Column */}
  <div>
    <ul className="list-disc space-y-2 list-inside">
      <li>
        <span className="font-semibold">Other Communities</span> – After the Mainnet launch, the <a href="https://liberdus.com/tokenomics/#/faq#faq-13" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">LDAO</a> will distribute coins to other communities as needed. As the issuance schedule is uncertain, a linear distribution (fixed daily amounts) will also be used until the maximum supply of 52.5 million coins is reached. However, these distributions are expected to occur less frequently but in larger amounts.
      </li>
    
<li>
      <span className="font-semibold">Total Liquid LIB:</span> This refers to the combined total of all liquid coins available from the distributions above at any given time.
   </li>
   </ul>
  </div>
  {/* End Right Column */}
</div>


  {/* Full-width: Adjustable Parameters within the Capped Elastic Supply Model */}
  <h3 className="text-xl font-semibold text-purple mt-6">Total Liquid LIB (excluding node rewards)</h3>
  <p className="mt-2">
   <LineChart chartData={chartData} />
  </p>
  </div>



  
    </div>




  );
}
