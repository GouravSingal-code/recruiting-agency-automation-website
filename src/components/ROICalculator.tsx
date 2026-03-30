"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [recruiters, setRecruiters] = useState(10);
  const [hoursManual, setHoursManual] = useState(15);
  const [placementFee, setPlacementFee] = useState(25000);
  const [hourlyCost, setHourlyCost] = useState(50);

  const automationRate = 0.7; // 70% of manual hours automated
  const hoursSavedWeek = Math.round(recruiters * hoursManual * automationRate);
  const hoursSavedYear = hoursSavedWeek * 52;
  const dollarSavedYear = hoursSavedYear * hourlyCost;
  const extraPlacements = Math.round(recruiters * 0.25 * 12); // ~0.25 extra/recruiter/month
  const extraRevenue = extraPlacements * placementFee;
  const totalValue = dollarSavedYear + extraRevenue;
  const costPer10Roles = 249 * 10; // Growth tier, 10 roles
  const roiQuickWin = Math.round(totalValue / costPer10Roles);
  const paybackMonths = Math.max(1, Math.round((costPer10Roles / (totalValue / 12)) * 10) / 10);

  return (
    <section id="roi-calculator" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Calculate Your Recruiting Automation ROI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            See how much time and money automation can save your agency. Adjust the sliders below.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-8 rounded-xl border border-card-border bg-card-bg p-6">
            <h3 className="text-lg font-semibold text-white">Your Numbers</h3>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Number of recruiters</span>
                <span className="font-semibold text-white">{recruiters}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={recruiters}
                onChange={(e) => setRecruiters(+e.target.value)}
                className="mt-2 w-full accent-accent-blue"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Manual hours/week per recruiter</span>
                <span className="font-semibold text-white">{hoursManual} hrs</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={hoursManual}
                onChange={(e) => setHoursManual(+e.target.value)}
                className="mt-2 w-full accent-accent-blue"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Avg placement fee ($)</span>
                <span className="font-semibold text-white">${placementFee.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={10000}
                max={50000}
                step={5000}
                value={placementFee}
                onChange={(e) => setPlacementFee(+e.target.value)}
                className="mt-2 w-full accent-accent-blue"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Recruiter hourly cost ($)</span>
                <span className="font-semibold text-white">${hourlyCost}</span>
              </div>
              <input
                type="range"
                min={25}
                max={75}
                step={5}
                value={hourlyCost}
                onChange={(e) => setHourlyCost(+e.target.value)}
                className="mt-2 w-full accent-accent-blue"
              />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-xl border border-accent-blue/30 bg-accent-blue/5 p-6">
            <h3 className="text-lg font-semibold text-white">Your Potential Savings</h3>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-card-border/50 pb-3">
                <span className="text-sm text-muted">Hours saved per week</span>
                <span className="text-lg font-bold text-accent-green">{hoursSavedWeek} hrs</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-3">
                <span className="text-sm text-muted">Hours saved per year</span>
                <span className="text-lg font-bold text-accent-green">{hoursSavedYear.toLocaleString()} hrs</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-3">
                <span className="text-sm text-muted">Value of time saved/year</span>
                <span className="text-lg font-bold text-accent-green">${dollarSavedYear.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-3">
                <span className="text-sm text-muted">Est. extra placements/year</span>
                <span className="text-lg font-bold text-accent-amber">{extraPlacements}</span>
              </div>
              <div className="flex justify-between border-b border-card-border/50 pb-3">
                <span className="text-sm text-muted">Extra revenue from placements</span>
                <span className="text-lg font-bold text-accent-amber">${extraRevenue.toLocaleString()}</span>
              </div>

              <div className="rounded-lg bg-accent-blue/10 p-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-white">Total annual value</span>
                  <span className="text-xl font-bold text-accent-blue">${totalValue.toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-card-bg p-3 text-center">
                  <div className="text-2xl font-bold text-accent-amber">{roiQuickWin}x</div>
                  <div className="text-xs text-muted">ROI on 10 roles ($2,490)</div>
                </div>
                <div className="rounded-lg bg-card-bg p-3 text-center">
                  <div className="text-2xl font-bold text-accent-green">{paybackMonths} mo</div>
                  <div className="text-xs text-muted">Payback period</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted">
            Want to see these numbers for YOUR agency?
          </p>
          <a
            href="#cta"
            className="mt-4 inline-block rounded-lg bg-accent-blue px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-blue/90"
          >
            Book Free Audit — We&apos;ll Calculate Your Exact ROI
          </a>
        </div>
      </div>
    </section>
  );
}
