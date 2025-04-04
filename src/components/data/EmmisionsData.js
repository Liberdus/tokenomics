// -----------------------------
// 1. Setup & Constants
// -----------------------------

// We'll consider "2 years" as 730 days.
const TOTAL_DAYS = 730;

// Initial amounts at Day 1
let directContributors    = 18_000_000; // starts at 18M
let operatingExpenses     =  9_000_000; // starts at 9M
let shardusHolders        =          0;
let otherCommunities      =          0;

// Maximum targets
const MAX_DIRECT          = 52_500_000; // 25%
const MAX_OPERATING       = 21_000_000; // 10%
const MAX_SHARDUS         = 21_000_000; // 20%
const MAX_OTHER           = 52_500_000; // 15%
// Sum => 210M

// Lumps happen every 28 days:
const DIRECT_LUMP         = 2_000_000;  // for Direct_Contributors
const OPERATING_LUMP      = 1_000_000;  // for Operating_Expenses

// Daily linear increments
// (We'll spread each category's remainder over 730 days)
const dailyShardus = MAX_SHARDUS / TOTAL_DAYS; 
const dailyOther   = MAX_OTHER   / TOTAL_DAYS; 

// A small helper to clamp increments so we never exceed the max:
function clamp(current, increment, maximum) {
  const next = current + increment;
  return next > maximum ? maximum : next;
}

// -----------------------------
// 2. Build the Emissions Data
// -----------------------------
function generateEmissionsData() {
  const data = [];

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    //
    // 1) Check lumps for Direct_Contributors
    //
    if (day % 28 === 0 && directContributors < MAX_DIRECT) {
      directContributors = clamp(directContributors, DIRECT_LUMP, MAX_DIRECT);
    }

    //
    // 2) Check lumps for Operating_Expenses
    //
    if (day % 28 === 0 && operatingExpenses < MAX_OPERATING) {
      operatingExpenses = clamp(operatingExpenses, OPERATING_LUMP, MAX_OPERATING);
    }

    //
    // 3) Daily increment for Shardus_Holders
    //
    if (shardusHolders < MAX_SHARDUS) {
      shardusHolders = clamp(shardusHolders, dailyShardus, MAX_SHARDUS);
    }

    //
    // 4) Daily increment for Other_Communities
    //
    if (otherCommunities < MAX_OTHER) {
      otherCommunities = clamp(otherCommunities, dailyOther, MAX_OTHER);
    }

    //
    // 5) Compute total for the day
    //
    const totalLiquid = 
      directContributors +
      operatingExpenses +
      shardusHolders +
      otherCommunities;

    //
    // 6) Push into array with the desired format
    //
    data.push({
      Day: day,
      Direct_Contributors: Math.round(directContributors),
      Operating_Expenses: Math.round(operatingExpenses),
      Distributed_Shardus_Holders: Math.round(shardusHolders),
      Other_Communities: Math.round(otherCommunities),
      TotalLiquid_LIB: Math.round(totalLiquid),
    });
  }

  return data;
}

// -----------------------------
// 3. Export as requested
// -----------------------------
export const EmmisionsData = generateEmissionsData();
