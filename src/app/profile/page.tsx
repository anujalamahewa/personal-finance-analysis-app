"use client";

import FinanceRoutePage from "@/lib/finance/ui/FinanceRoutePage";
import { useFinance } from "@/lib/finance/ui/FinanceProvider";
import styles from "./page.module.css";

function toNumber(value: string): number {
  const parsed = Number(value.replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value) || value === 0) {
    return "";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProfilePage() {
  const {
    state,
    computed,
    setProfileField,
    setCoverageField,
    addChild,
    updateChild,
    removeChild,
  } = useFinance();

  return (
    <FinanceRoutePage
      routeId="profile"
      customBody={
        <>
          <div className={styles.profileHeroLabel}>Step 1</div>
          <h1 className={styles.profileTitle}>Client Profile</h1>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Full Name</label>
              <input
                className={styles.input}
                value={state.profile.fullName}
                onChange={(event) => setProfileField("fullName", event.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Occupation</label>
              <input
                className={styles.input}
                value={state.profile.occupation}
                onChange={(event) => setProfileField("occupation", event.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Date of Birth</label>
              <input
                type="date"
                className={styles.input}
                value={state.profile.dateOfBirth}
                onChange={(event) => {
                  const dob = event.target.value;
                  setProfileField("dateOfBirth", dob);
                  if (dob) {
                    const birthDate = new Date(dob);
                    const age = Math.floor(
                      (Date.now() - birthDate.getTime()) / (365.25 * 24 * 3600 * 1000)
                    );
                    setProfileField("age", Math.max(0, age));
                  }
                }}
              />
            </div>
            <div>
              <label className={styles.label}>Current Age</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="35"
                className={styles.input}
                value={formatNumber(state.profile.age)}
                onChange={(event) => setProfileField("age", toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Target Retirement Age</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="60"
                className={styles.input}
                value={formatNumber(state.profile.retirementAge)}
                onChange={(event) =>
                  setProfileField("retirementAge", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Spouse or Partner Name</label>
              <input
                className={styles.input}
                value={state.profile.spouseName}
                onChange={(event) => setProfileField("spouseName", event.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Monthly Income (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="150,000"
                className={styles.input}
                value={formatNumber(state.profile.monthlyIncome)}
                onChange={(event) =>
                  setProfileField("monthlyIncome", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Monthly Expenses (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="120,000"
                className={styles.input}
                value={formatNumber(state.profile.monthlyExpenses)}
                onChange={(event) =>
                  setProfileField("monthlyExpenses", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Monthly Savings (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="30,000"
                className={styles.input}
                value={formatNumber(state.profile.monthlySavings)}
                onChange={(event) =>
                  setProfileField("monthlySavings", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Outstanding Loans (LKR)</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.profile.outstandingLoans)}
                onChange={(event) =>
                  setProfileField("outstandingLoans", toNumber(event.target.value))
                }
              />
            </div>
          </div>

          <h2 className={styles.sectionTitle}>Children</h2>
          <div className={styles.rowActions}>
            <button
              className={`${styles.btn} ${styles.btnPrimary} ${styles.addChildButton}`}
              onClick={addChild}
            >
              Add Child
            </button>
            <span className={styles.badge}>Family members: {computed.familyMembers}</span>
          </div>
          <div className={styles.childrenWrap}>
            {state.children.length === 0 && (
              <div className={styles.cardMuted}>No children added yet.</div>
            )}
            {state.children.map((child, index) => (
              <div key={child.id} className={styles.childRow}>
                <div className={styles.childHeader}>
                  <div className={styles.childTitle}>Child {index + 1}</div>
                  <button className={styles.btn} onClick={() => removeChild(child.id)}>
                    Remove
                  </button>
                </div>
                <div className={styles.formGrid}>
                  <div>
                    <label className={styles.label}>Name</label>
                    <input
                      className={styles.input}
                      value={child.name}
                      onChange={(event) => updateChild(child.id, "name", event.target.value)}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Age</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="5"
                      className={styles.input}
                      value={formatNumber(child.age)}
                      onChange={(event) => updateChild(child.id, "age", toNumber(event.target.value))}
                    />
                  </div>
                  <div>
                    <label className={styles.label}>University Age</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="18"
                      className={styles.input}
                      value={formatNumber(child.universityAge)}
                      onChange={(event) =>
                        updateChild(child.id, "universityAge", toNumber(event.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className={styles.label}>Education Cost Today (LKR)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="3,000,000"
                      className={styles.input}
                      value={formatNumber(child.currentEducationCost)}
                      onChange={(event) =>
                        updateChild(child.id, "currentEducationCost", toNumber(event.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>Existing Coverage</h2>
          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Life Cover</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.life)}
                onChange={(event) => setCoverageField("life", toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Disability Cover</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.disability)}
                onChange={(event) => setCoverageField("disability", toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Critical Illness Cover</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.criticalIllness)}
                onChange={(event) =>
                  setCoverageField("criticalIllness", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Medical Cover</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.medical)}
                onChange={(event) => setCoverageField("medical", toNumber(event.target.value))}
              />
            </div>
            <div>
              <label className={styles.label}>Retirement Fund</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.retirement)}
                onChange={(event) =>
                  setCoverageField("retirement", toNumber(event.target.value))
                }
              />
            </div>
            <div>
              <label className={styles.label}>Education Savings</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className={styles.input}
                value={formatNumber(state.coverage.education)}
                onChange={(event) => setCoverageField("education", toNumber(event.target.value))}
              />
            </div>
          </div>
        </>
      }
    />
  );
}
