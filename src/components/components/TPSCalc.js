import React from "react";
import RangeSlider from "../assets/range-slider.js";

export default class TPSCalc extends React.Component {
  state = {
    SliderValue1: 1300,
    ActiveValidatorsShardeum: 1300,
    ActiveValidatorsNonSharded: 1300,
    ShardeumTPS: 22,
    NonShardedTPS: 22,
    TPSPerNode: 2,
    NodesPerShard: 120,
    LowestPerformingNode: 22,
  };

  onSliderChange = (event) => {
    this.setState(
      { ActiveValidatorsShardeum: event.target.value },
      () => this.onUpdate()
    );
  };

  onSliderChange2 = (event) => {
    this.setState(
      { ActiveValidatorsNonSharded: event.target.value },
      () => this.onUpdate()
    );
  };

  onUpdate = () => {
    this.setState(
      {
        TPSPerNode: document.getElementById("TPSPerNode").value,
        NodesPerShard: document.getElementById("NodesPerShard").value,
        LowestPerformingNode: document.getElementById("LowestPerformingNode").value,
      },
      () => this.UpdateTPS()
    );
  };

  UpdateTPS = () => {
    this.setState({
      ShardeumTPS:
        (this.state.TPSPerNode * this.state.ActiveValidatorsShardeum) /
        this.state.NodesPerShard,
      NonShardedTPS: this.state.LowestPerformingNode,
    });
  };

render() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start w-full">
        
        {/* Sharded Network TPS Section */}
        <div className="flex flex-col p-4 StabilityFactor border rounded-lg bg-white shadow-md md:h-full md:min-h-[450px] items-start">
          <h2 className="text-lg font-bold">Sharded Network TPS Calculation (Horizontal Scaling)</h2>
          
          <div className="form-control min-h-200 w-full">
            <RangeSlider
              title={"Active Validator Nodes"}
              id="ActiveValidatorsShardeum"
              desc={"Active Nodes"}
              max={100000}
              start={1300}
              onSliderChange={this.onSliderChange}
            />
          </div>

          <div className="form-control min-h-200 w-full">
            <label className="label">
              <span className="label-text">Nodes per Shard</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                value={this.state.NodesPerShard}
                id="NodesPerShard"
                className="input input-bordered w-full max-w-xs"
                onChange={this.onUpdate}
              />
              <span>Nodes</span>
            </label>
          </div>

          <div className="form-control min-h-200 w-full">
            <label className="label">
              <span className="label-text">Node TPS #/s</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                value={this.state.TPSPerNode}
                id="TPSPerNode"
                className="input input-bordered w-full max-w-xs"
                onChange={this.onUpdate}
              />
              <span>TPS</span>
            </label>
          </div>

          <div className="stats shadow w-full mt-auto">
            <div className="stat">
              <div className="stat-title">Network TPS</div>
              <div className="stat-value">{this.state.ShardeumTPS.toFixed(0)}</div>
              <div className="stat-desc">
                Network TPS = TPS per Node * Number of Nodes / Nodes per Shard
              </div>
            </div>
          </div>
        </div>

        {/* Non-Sharded Network TPS Section */}
        <div className="flex flex-col p-4 StabilityFactor border rounded-lg bg-white shadow-md md:h-full md:min-h-[450px] items-start">
          <h2 className="text-lg font-bold">Non-Sharded Network TPS Calculation (Vertical Scaling)</h2>

          <div className="form-control min-h-200 w-full">
            <RangeSlider
              title={"Active Validator Nodes"}
              id="ActiveValidatorsNonSharded"
              desc={"Active Nodes"}
              max={100000}
              start={1300}
              onSliderChange={this.onSliderChange2}
            />
          </div>

          <div className="form-control min-h-200 w-full">
            <label className="label">
              <span className="label-text">Lowest Performing Node TPS #/s</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                value={this.state.LowestPerformingNode}
                id="LowestPerformingNode"
                className="input input-bordered w-full max-w-xs"
                onChange={this.onUpdate}
              />
              <span>TPS</span>
            </label>
          </div>

          <div className="stats shadow w-full mt-auto">
            <div className="stat">
              <div className="stat-title">Network TPS</div>
              <div className="stat-value">{this.state.NonShardedTPS}</div>
              <div className="stat-desc">
                Network TPS = TPS of Lowest Performing Node
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}


}