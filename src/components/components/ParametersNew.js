import React from "react";

export default class AprCalc extends React.Component {
  state = {
    NodeTPS: 2,
    Nodes: 600,
    NodesPerShard: 120,
    NetworkTPS: 20,
    TXfees: 0.01,
    NodeRewardPerHour: 1,
    Stake: 1000,
    StabilityFactor: 1,
    SHMValue: 1,
    AvgTxFee: 0,
    ActiveNodes: 0,
    SeverRentPerHour: 0.2,
    TPSPerNode: 2,
    SHMSupply: 259080000,
    StandbyRatio: 0,
    RevenuePerDay: 0,
    ExpensePerDay: 0,
    IncomePerDay: 0,
    APYPerYear: 0,
    MarketAPY: 10,
    NetworkRevenuePerDay: 0,
    NetworkExpensePerDay: 0,
    NetworkIncomePerDay: 0,
    NetworkDeltaPerDay: 0,
    MinNodes: 600,
    CustomTXChecked: false,
    CustomDisabled: true
  };




  componentDidMount() {
    this.setState({
      AvgTxFee: this.state.TXfees * 2,
      ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
      StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
    }, () => this.updateIncome());
  };

  onCustomTXCheckedChange = (event) => {
    this.setState({
      CustomTXChecked: !this.state.CustomTXChecked,
      CustomDisabled: !this.state.CustomDisabled
    }, () => this.updateMonitoring());
  };

  onNodesPerShardChange = (event) => {
    this.setState({
      NodesPerShard: event.target.value
    }, () => this.updateMonitoring());
  };

  onTXfeesChange = (event) => {
    this.setState({
      TXfees: event.target.value
    }, () => this.updateMonitoring());

  };

  onNodeRewardPerHourChange = (event) => {
    this.setState({
      NodeRewardPerHour: event.target.value
    }, () => this.updateMonitoring());

  };

  onStakeChange = (event) => {
    this.setState({
      Stake: event.target.value
    }, () => this.updateMonitoring());

  };

  onStabilityFactorChange = (event) => {
    this.setState({
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());

  };

  onMinNodesChange = (event) => {
    this.setState({
      MinNodes: event.target.value
    }, () => this.updateMonitoring());

  };

  updateMonitoring = (event) => {
    if (this.state.CustomTXChecked === true) {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1),
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.AvgTxFee,
          ActiveNodes: this.state.MinNodes,
          StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }
    } else {
      if (this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard >= this.state.MinNodes) {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.NetworkTPS / this.state.TPSPerNode * this.state.NodesPerShard,
            StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      } else {
        this.setState({
          NetworkTPS: this.state.NetworkTPS,
          AvgTxFee: this.state.TXfees * 2,
          ActiveNodes: this.state.MinNodes,
            StandbyRatio: Math.max(0, this.state.NodeRewardPerHour * 24 / (this.state.MarketAPY * this.state.Stake / 36500 + this.state.SeverRentPerHour * 24) - 1)
        }, () => this.updateIncome());
      }

    }

  };

  onSHMValueChange = (event) => {
    this.setState({
      SHMValue: event.target.value,
      StabilityFactor: event.target.value
    }, () => this.updateMonitoring());

  };

  onAvgTxFeeChange = (event) => {
    this.setState({
      AvgTxFee: event.target.value
    }, () => this.updateMonitoring());

  };

  onNetworkTPSChange = (event) => {
    this.setState({
      NetworkTPS: event.target.value
    }, () => this.updateMonitoring());

  };

  onActiveNodesChange = (event) => {
    this.setState({
      ActiveNodes: event.target.value
    }, () => this.updateMonitoring());

  };



  onSeverRentPerHourChange = (event) => {
    this.setState({
      SeverRentPerHour: event.target.value
    }, () => this.updateMonitoring());

  };

  onTPSPerNodeChange = (event) => {
    this.setState({
      TPSPerNode: event.target.value
    }, () => this.updateMonitoring());

  };

  onSHMSupplyChange = (event) => {
    this.setState({
      SHMSupply: event.target.value
    }, () => this.updateMonitoring());

  };

  onMarketAPYChange = (event) => {
    this.setState({
      MarketAPY: event.target.value
    }, () => this.updateMonitoring());

  };

  updateIncome = (event) => {
    this.setState({
      RevenuePerDay: this.state.NodeRewardPerHour * 24 / (this.state.StandbyRatio + 1),
      ExpensePerDay: this.state.SeverRentPerHour * 24,
      NetworkRevenuePerDay: this.state.NetworkTPS * 86400 * this.state.AvgTxFee,
      NetworkExpensePerDay: this.state.ActiveNodes * this.state.NodeRewardPerHour * 24,
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor,
    }, () => this.updateIncomeDay());
  };

  updateIncomeDay = (event) => {
    this.setState({
      NetworkIncomePerDay: this.state.NetworkRevenuePerDay - this.state.NetworkExpensePerDay,
      IncomePerDay: this.state.RevenuePerDay - this.state.ExpensePerDay
    }, () => this.updateAPY());
  };

  updateAPY = (event) => {
    this.setState({
      NetworkDeltaPerDay: this.state.NetworkIncomePerDay / this.state.StabilityFactor,
      APYPerYear: 100 * this.state.IncomePerDay * 365 / this.state.Stake
    })
  };

  render() {
    return (
      <>
 
<div className="bg-white min-h-screen w-full">
  <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-4">
    {/* First Column */}
    <div className="bg-white  rounded-lg p-4 flex-grow">
      <h2 className="text-xl font-semibold mb-4 text-purple">Network Parameters</h2>

      {/* Split into Two Sections */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Section: Network and FDAO Controls */}
        <div className="flex-1">
          {/* Network Form */}
          


          {/* Network Section */}
<div className="p-4 rounded-lg shadow">
  <h3 className="font-semibold text-darkGrey mb-4">Network</h3>

  {/* Nodes per Shard */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text text-darkGrey">Nodes per Shard</span>
    </label>
    <div className="tooltip" data-tip="Determines security and redundancy of the network">
      <label className="input-group text-darkGrey">
        <input
          type="text"
          value={this.state.NodesPerShard}
          className="input input-bordered"
          onChange={this.onNodesPerShardChange}
        />
        <span>Nodes</span>
      </label>
    </div>
  </div>

  {/* Min Nodes */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Min Nodes</span>
    </label>
    <div className="tooltip" data-tip="This is the minimum number of nodes the network must have regardless of how low the TPS is. This is needed in order to maintain a certain level of decentralization.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.MinNodes}
          className="input input-bordered"
          onChange={this.onMinNodesChange}
        />
        <span>Nodes</span>
      </label>
    </div>
  </div>
</div>

        
      
    

{/* FDAO Controls */}
<div className="p-4 rounded-lg mt-4 shadow">
  <h3 className="font-semibold mb-4">FDAO Controls</h3>

  {/* Tx Fee */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Tx Fee $</span>
    </label>
    <div className="tooltip" data-tip="This is the target fee for a token transfer transaction. SHM transfer will be less; AMM txs will be more.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.TXfees}
          className="input input-bordered"
          onChange={this.onTXfeesChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Node Reward */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Node Reward $/hr</span>
    </label>
    <div className="tooltip" data-tip="This defines how much each active node in the network receives as dollars per hour. Although it is specified in $, it is paid out in SHM.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.NodeRewardPerHour}
          className="input input-bordered"
          onChange={this.onNodeRewardPerHourChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Stake Amount */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Stake Amount $</span>
    </label>
    <div className="tooltip" data-tip="The amount of SHM a node must stake in order to join the network. Specified in $ but staked in SHM based on price set by Stability factor. Some or all of the stake can be lost if node misbehaves or falls behind in processing. This ensures that operators run nodes on good hardware.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.Stake}
          className="input input-bordered"
          onChange={this.onStakeChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Stable Price */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Stable Price $/SHM</span>
    </label>
    <div className="tooltip" data-tip="Same as SHM price, but set by FDAO into the network. Updated about once a day. Used by the network to determine the SHM amount for target Tx Fee, Node reward, and Stake amount.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.SHMValue}
          className="input input-bordered"
          disabled
          onChange={this.onStabilityFactorChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>
</div>
    </div>



        {/* Right Section: FDAO Monitoring and Continued */}
        <div className="flex-1">
  {/* FDAO Monitoring */}
  <div className="p-4 rounded-lg shadow">
    <h3 className="font-semibold mb-4">FDAO Monitoring</h3>

    {/* SHM Price */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">SHM Price $</span>
      </label>
      <div className="tooltip" data-tip="FDAO uses this to set the Stability Factor. Stability factor changed about once a day.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.SHMValue}
            className="input input-bordered"
            onChange={this.onSHMValueChange}
          />
          <span>USD</span>
        </label>
      </div>
    </div>

    {/* Average Tx Fee */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Average Tx Fee $</span>
      </label>
      <div className="tooltip" data-tip="This is the actual average tx fees on the network. Typically will be more than the target Tx Fee set by FDAO. Maybe about 2x the target Tx Fee.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.AvgTxFee}
            className="input input-bordered"
            disabled={this.state.CustomDisabled}
            onChange={this.onAvgTxFeeChange}
          />
          <span>USD</span>
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text customLabel">Use custom TX Fee</span>
            <input
              type="checkbox"
              checked={this.state.CustomTXChecked}
              className="checkbox checkbox-purple"
              onChange={this.onCustomTXCheckedChange}
            />
          </label>
        </div>
      </div>
    </div>

    {/* Network TPS */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Network TPS</span>
      </label>
      <div className="tooltip" data-tip="This is the actual TPS of the network. On BSC and Polygon this is about 40 TPS.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.NetworkTPS}
            className="input input-bordered"
            onChange={this.onNetworkTPSChange}
          />
          <span>TPS</span>
        </label>
      </div>
    </div>

    {/* Active Nodes */}
    <div className="form-control min-h-200">
      <label className="label">
        <span className="label-text">Active Nodes</span>
      </label>
      <div className="tooltip" data-tip="This is the actual number of nodes the network needs to process the Network TPS. There is a minimum number of nodes the network must have. Network TPS / Node TPS * Nodes/shard or min of 600 nodes.">
        <label className="input-group">
          <input
            type="text"
            value={this.state.ActiveNodes}
            className="input input-bordered"
            disabled
          />
          <span>Nodes</span>
        </label>
      </div>
    </div>
    {/* Market APY */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Market APY</span>
    </label>
    <div className="tooltip" data-tip="This represents what current market APY is for other investment options. For example, putting money into a CD or bond. Node operators will look at this and compare it to the APY they can earn by running a node. The number of nodes in standby will adjust so that the APY for running a node will get close to this market APY.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.MarketAPY}
          className="input input-bordered"
          onChange={this.onMarketAPYChange}
        />
        <span>%</span>
      </label>
    </div>
  </div>

  {/* Standby Ratio */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Standby Ratio #</span>
    </label>
    <div className="tooltip" data-tip="Standby / Active ratio. Increasing the node reward will increase this. Will probably increase until the APY is close to Market APY. Standby ratio = Node reward x 24 / (Market APY x Stake amount / 365 x 100 + Server rent x 24). If Standby ratio < 1 then set it to 1.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.StandbyRatio.toFixed(2)}
          className="input input-bordered"
          disabled
          onChange={this.onStandbyRatioChange}
        />
        <span>S:A</span>
      </label>
    </div>
  </div>

  {/* Server Rent */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Server Rent $/hr</span>
    </label>
    <div className="tooltip" data-tip="On Linode.com $0.20/hr gets 8 cores, 16 GB RAM, 320 GB SSD, 6 TB/mo transfer, 40 Gbps download / 6 Gbps upload.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.SeverRentPerHour}
          className="input input-bordered"
          onChange={this.onSeverRentPerHourChange}
        />
        <span>USD</span>
      </label>
    </div>
  </div>

  {/* Node TPS */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">Node TPS #/s</span>
    </label>
    <div className="tooltip" data-tip="Cool TPS per node; about 20% of Max TPS; a node can easily handle this TPS.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.TPSPerNode}
          className="input input-bordered"
          onChange={this.onTPSPerNodeChange}
        />
        <span>TPS</span>
      </label>
    </div>
  </div>

  {/* SHM Supply */}
  <div className="form-control min-h-200">
    <label className="label">
      <span className="label-text">SHM Supply #</span>
    </label>
    <div className="tooltip" data-tip="Supply is used to guide decisions on the parameters the FDAO sets. Must keep this below 259080000 SHM. It can go up and down based on Network Income. SHM Supply = SHM Supply - SHM Delta.">
      <label className="input-group">
        <input
          type="text"
          value={this.state.SHMSupply}
          className="input input-bordered"
          disabled
          onChange={this.onSHMSupplyChange}
        />
        <span>SHM</span>
      </label>
    </div>
  </div>
  </div>





      
        </div>
      </div>
    </div>

    {/* Second Column (Sticky) */}
    <div className="bg-white  rounded-lg p-4 lg:sticky top-4 h-fit lg:w-1/2">
  <div className="flex-1 min-w-full apr-stats">
    <h2 className="pt-0 text-xl font-semibold text-purple">Node Income</h2>
    <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Revenue/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.RevenuePerDay.toFixed(2)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Node reward * 24 / Standby ratio</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Expense/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.ExpensePerDay.toFixed(2)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Expense $/day</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Income/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.IncomePerDay.toFixed(2)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Income = Revenue - Expense</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">APY/year</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {this.state.APYPerYear.toFixed(2) + "%"}
        </dd>
        <p className="mt-2 text-sm text-gray-500">100 * Income * 365 / Stake amount</p>
      </div>
    </dl>
  </div>

  <div className="flex-1 min-w-full">
    <h2 className="pt-10 text-xl font-semibold text-purple">Network Income</h2>
    <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Revenue/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.NetworkRevenuePerDay.toFixed(0)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Daily tx volume * Tx fee</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Expense/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.NetworkExpensePerDay.toFixed(0)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Active nodes * Node reward * 24</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Income/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {"$" + this.state.NetworkIncomePerDay.toFixed(0)}
        </dd>
        <p className="mt-2 text-sm text-gray-500">Income = Revenue - Expense</p>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">Delta SHM/day</dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 break-words">
          {this.state.NetworkDeltaPerDay.toFixed(0) + " SHM"}
        </dd>
        <p className="mt-2 text-sm text-gray-500">SHM Delta = Income / Stability factor</p>
      </div>
    </dl>
  </div>
</div>
</div>
</div>




      </>
    );
  }
}
