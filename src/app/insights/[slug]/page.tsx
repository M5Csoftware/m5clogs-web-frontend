import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtSvg, Icon } from "@/components/ArtSvg";
import { POSTS, bcatName } from "@/data/koreanLogisticsData";

export async function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const wordsCount = post.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(2, Math.round(wordsCount / 220));

  return (
    <div className="py-12">
      {/* Article Header */}
      <section className="ahead">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/insights">Insights</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{bcatName(post.cat)}</span>
          </nav>
          <span className="ctag block mb-2">{bcatName(post.cat)}</span>
          <h1 style={{ marginTop: "14px" }}>{post.title}</h1>
          <p className="lead">{post.desc}</p>
          <div className="m mt-4 text-xs text-[var(--muted)] flex items-center gap-4">
            <span>By the M5 Clogs team</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{readMins} min read</span>
          </div>
        </div>
      </section>

      {/* Featured Header Illustration Banner */}
      <div className="afig my-8">
        <div className="cv rounded-3xl overflow-hidden p-12 flex items-center justify-center" style={{ background: post.bg }}>
          <ArtSvg artKey={post.cover} className="w-48 h-48" />
        </div>
      </div>

      {/* Article Body & Sidebar */}
      <div className="alay">
        <aside className="toc hidden lg:block">
          <b>Article Overview</b>
          <p className="text-xs text-[var(--muted)] leading-relaxed mt-2">
            Regulatory & trade advisory prepared by M5 Clogs.in for Indian retailers, distributors, and exporters.
          </p>
        </aside>

        <article className="prose">
          <div
            dangerouslySetInnerHTML={{ __html: post.body }}
            className="prose-content space-y-4"
          />

          {post.sources && post.sources.length > 0 && (
            <div className="srcs mt-10 pt-6 border-t border-[var(--line)]">
              <b className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-2">
                Official Sources & References
              </b>
              <ul className="text-xs space-y-1.5 text-[var(--jade)]">
                {post.sources.map(([name, url], i) => (
                  <li key={i}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--persimmon)]">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="srcs mt-8 pt-6 border-t border-[var(--line)]">
            <b className="block text-xs uppercase tracking-wider text-[var(--muted)] mb-3">
              Related Product Categories
            </b>
            <div className="flex flex-wrap gap-2">
              <Link href="/products/skincare-beauty" className="btn btn-o btn-sm text-xs">
                Korean Skincare & Beauty
              </Link>
              <Link href="/products/food-beverages" className="btn btn-o btn-sm text-xs">
                Korean Food & Beverages
              </Link>
              <Link href="/import-distribution" className="btn btn-o btn-sm text-xs">
                Import & Distribution
              </Link>
            </div>
          </div>
        </article>

        {/* Share & Consultation Box */}
        <aside className="share">
          <b>Business Enquiries</b>
          <div className="p-5 rounded-2xl bg-[var(--paper)] border border-[var(--line)] mt-3 space-y-3">
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Planning to stock Korean products or require CDSCO / FSSAI compliant supply?
            </p>
            <Link href="/partnerships?go=form" className="btn btn-p btn-sm w-full text-center">
              Request Catalogue
            </Link>
          </div>
        </aside>
      </div>

      {/* Related Articles Carousel */}
      <section className="pad paper mt-12">
        <div className="wrap">
          <div className="shead">
            <h2>Related articles</h2>
            <Link href="/insights" className="btn btn-o">
              View all articles
            </Link>
          </div>
          <div className="posts">
            {related.map((r) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="post group">
                <div className="cv" style={{ background: r.bg }}>
                  <div className="w-full h-full p-8 flex items-center justify-center">
                    <ArtSvg artKey={r.cover} className="w-24 h-24" />
                  </div>
                </div>
                <div className="m">
                  <span className="ctag">{bcatName(r.cat)}</span>
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <span className="tl">
                  <span>Read article</span>
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
