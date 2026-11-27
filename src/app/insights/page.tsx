"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import { POSTS, BCATS, bcatName } from "@/data/koreanLogisticsData";

export default function InsightsPage() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const feat = POSTS.find((p) => p.featured) || POSTS[0];

  const filteredPosts = POSTS.filter((p) => {
    const matchCat = selectedCat === "all" || p.cat === selectedCat;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      bcatName(p.cat).toLowerCase().includes(query);
    return matchCat && matchQuery;
  });

  return (
    <div className="py-12">
      <section className="phero" style={{ paddingBottom: "30px" }}>
        <div className="wrap in">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Insights</span>
            </nav>
            <h1>
              Insights from <em>Korea</em> to India
            </h1>
            <p className="lead">
              Market trends, product guides and import regulations for businesses working with Korean products.
            </p>
          </div>
          <div className="hg hidden md:block" aria-hidden="true">
            소식
          </div>
        </div>
      </section>

      <section className="pad-s" style={{ paddingTop: "20px" }}>
        <div className="wrap">
          {/* Featured Post */}
          <Link href={`/insights/${feat.slug}`} className="featured group">
            <div className="cv" style={{ background: feat.bg }}>
              <div className="w-full h-full p-8 flex items-center justify-center">
                <ArtSvg artKey={feat.cover} className="w-44 h-44" />
              </div>
            </div>
            <div>
              <div className="post">
                <div className="m">
                  <span className="ctag">{bcatName(feat.cat)}</span>
                  <span className="font-bold text-xs text-[var(--persimmon)]">Featured</span>
                  <time dateTime={feat.date}>
                    {new Date(feat.date + "T00:00:00").toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>
              <h2>{feat.title}</h2>
              <p className="lead">{feat.desc}</p>
              <span className="tl">
                <span>Read the article</span>
                <Icon name="arrow" />
              </span>
            </div>
          </Link>

          {/* Filter Chips & Search Bar */}
          <div className="bfilter">
            <div className="chips" role="group" aria-label="Filter by category">
              <button
                type="button"
                onClick={() => setSelectedCat("all")}
                aria-pressed={selectedCat === "all"}
              >
                All
              </button>
              {BCATS.map(([slug, name]) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setSelectedCat(slug)}
                  aria-pressed={selectedCat === slug}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="bsearch relative min-w-[220px]">
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full !pl-9 pr-4 py-2 text-xs rounded-full border border-[var(--line)] bg-[var(--paper)] focus:outline-none focus:border-[var(--persimmon)] transition font-medium"
                style={{ paddingLeft: "2.4rem" }}
              />
              <svg className="w-4 h-4 text-[var(--muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <p className="muted text-xs mb-6">
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
            {selectedCat !== "all" ? ` in ${bcatName(selectedCat)}` : ""}
          </p>

          {/* Post Grid */}
          <div className="posts">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Link key={post.slug} href={`/insights/${post.slug}`} className="post group">
                  <div className="cv" style={{ background: post.bg }}>
                    <div className="w-full h-full p-8 flex items-center justify-center">
                      <ArtSvg artKey={post.cover} className="w-28 h-28" />
                    </div>
                  </div>
                  <div className="m">
                    <span className="ctag">{bcatName(post.cat)}</span>
                    <time dateTime={post.date}>
                      {new Date(post.date + "T00:00:00").toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <span className="tl">
                    <span>Read more</span>
                    <Icon name="arrow" />
                  </span>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 border-2 border-dashed border-[var(--line)] rounded-3xl text-[var(--muted)]">
                <p>No articles match your search or filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCat("all");
                    setSearchQuery("");
                  }}
                  className="btn btn-o btn-sm mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
