import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ArtSvg";
import { CAPS, PROCESS } from "@/data/koreanLogisticsData";

export const metadata = {
  title: "Korea to India Import & Distribution Services | M5 Clogs.in",
  description:
    "How Korean products travel from manufacturer in South Korea to Indian retail shelves, and the role M5 Clogs coordinates at each stage.",
};

export default function ImportDistributionPage() {
  return (
    <div className="py-12">
      <section className="phero">
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Import & Distribution</span>
            </nav>
            <h1>
              Import & <em>distribution</em>
            </h1>
            <p className="lead">
              How Korean products travel from manufacturer to Indian shelf, and the part M5 Clogs plays
              at each stage.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            수입
          </div>
        </div>
      </section>

      <section className="pad-s">
        <div className="wrap split">
          <div>
            {CAPS.map((cap, i) => (
              <div
                key={i}
                className="subblock"
                style={{ gridTemplateColumns: "70px 1fr", gap: "24px", padding: "34px 0" }}
              >
                <span
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "20px",
                    background: "var(--celadon-l)",
                    color: "var(--jade)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Icon name={cap.icon} className="w-8 h-8" />
                </span>
                <div>
                  <span className="k font-mono font-bold text-xs">0{i + 1}</span>
                  <h2 style={{ fontSize: "2rem" }}>{cap.title}</h2>
                  <p style={{ margin: 0 }}>{cap.desc}</p>
                </div>
              </div>
            ))}

            <h2 style={{ marginTop: "50px", fontSize: "2.4rem" }}>The journey</h2>
            <ol className="proc" style={{ marginTop: "30px" }}>
              {PROCESS.map((p, i) => (
                <li key={i}>
                  <span className="dot">{i + 1}</span>
                  <span className="where">{p.where}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <div className="side">
              <h3 style={{ color: "#fff", fontFamily: "var(--serif)", fontSize: "1.8rem", lineHeight: 1.1 }}>
                Compliance first
              </h3>
              <p>
                Imported cosmetics need CDSCO registration; imported food needs FSSAI clearance. See how
                we approach both.
              </p>
              <Link href="/compliance" className="btn btn-p" style={{ width: "100%" }}>
                Import compliance & quality
              </Link>
              <hr />
              <Link href="/insights/import-korean-cosmetics-india-cdsco" className="s">
                CDSCO registration explained →
              </Link>
              <Link href="/insights/import-korean-food-india-fssai" className="s">
                FSSAI import clearance guide →
              </Link>
              <Link href="/partnerships?go=form" className="s">
                Start business enquiry →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
