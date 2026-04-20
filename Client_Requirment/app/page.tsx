type CardItem = {
    title: string;
    subtitle?: string[];
    image: string;
};

type FeatureItem = {
    title: string;
    line1: string;
    line2?: string;
    icon: string;
};

type ServiceItem = {
    title: string;
    subtitle?: string;
    icon: string;
};

const leftCards: CardItem[] = [
    {
        title: "CONCERTS",
        subtitle: ["LARGE SCALE.", "FLAWLESS", "EXPERIENCES."],
        image: "/images/concerts.jpg",
    },
    {
        title: "CORPORATE EVENTS",
        subtitle: ["ENGAGE.", "INSPIRE.", "ACHIEVE."],
        image: "/images/corporate-events.jpg",
    },
    {
        title: "WEDDINGS",
        subtitle: ["CRAFTING", "TIMELESS", "MEMORIES."],
        image: "/images/weddings.jpg",
    },
    {
        title: "EXHIBITIONS",
        subtitle: ["SHOWCASING", "BRANDS.", "CREATING", "IMPACT."],
        image: "/images/exhibitions.jpg",
    },
];

const rightCards: CardItem[] = [
    {
        title: "STAGE PRODUCTION",
        subtitle: ["ENGINEERED", "FOR STRENGTH.", "BUILT TO", "PERFORM."],
        image: "/images/stage-production.jpg",
    },
    {
        title: "GALA DINNERS",
        subtitle: ["ELEGANCE.", "ATMOSPHERE.", "PERFECTION."],
        image: "/images/gala-dinners.jpg",
    },
    {
        title: "PRODUCT LAUNCHES",
        subtitle: ["LAUNCH.", "ENGAGE.", "ELEVATE."],
        image: "/images/product-launches.jpg",
    },
    {
        title: "FESTIVALS & SPORTS EVENTS",
        subtitle: ["ENERGY.", "SCALE.", "UNFORGETTABLE", "MOMENTS."],
        image: "/images/festivals.jpg",
    },
];

const features: FeatureItem[] = [
    { title: "CREATIVE", line1: "SOLUTIONS", icon: "💡" },
    { title: "EXPERT", line1: "EXECUTION", icon: "⚙️" },
    { title: "CLIENT", line1: "TRUST", icon: "👥" },
    { title: "SAFETY", line1: "FIRST", icon: "🛡️" },
    { title: "PROVEN", line1: "SUCCESS", icon: "🏆" },
];

const services: ServiceItem[] = [
    { title: "RINGLOCK SCAFFOLDING", subtitle: "RENTAL", icon: "▦" },
    { title: "STAGE & TRUSSING", subtitle: "(UP TO 30M SPAN)", icon: "⊓" },
    { title: "EVENT", subtitle: "PRODUCTION", icon: "◫" },
    { title: "SAFETY CERTIFICATION", subtitle: "& LOAD DESIGN", icon: "☑" },
];

const galleryImages = [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
];

function SideCard({
    item,
    align = "left",
}: {
    item: CardItem;
    align?: "left" | "right";
}) {
    return (
        <div className="sideCard">
            <img src={item.image} alt={item.title} className="sideCardImage" />
            <div className={`sideCardOverlay ${align}`}>
                <h3>{item.title}</h3>
                {item.subtitle && (
                    <div className="sideCardCopy">
                        {item.subtitle.map((line) => (
                            <span key={line}>{line}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function Feature({ item }: { item: FeatureItem }) {
    return (
        <div className="featureItem">
            <div className="featureIcon">{item.icon}</div>
            <div className="featureText">
                <span>{item.title}</span>
                <span>{item.line1}</span>
                {item.line2 && <span>{item.line2}</span>}
            </div>
        </div>
    );
}

function Service({ item }: { item: ServiceItem }) {
    return (
        <div className="serviceItem">
            <div className="serviceIcon">{item.icon}</div>
            <div className="serviceText">
                <span>{item.title}</span>
                {item.subtitle && <span>{item.subtitle}</span>}
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <main className="aaaPage">
            <section className="posterShell">
                <aside className="sideColumn left">
                    {leftCards.map((item) => (
                        <SideCard key={item.title} item={item} align="left" />
                    ))}
                </aside>

                <section className="centerPanel">
                    <div className="centerInner">
                        <div className="logoRow" aria-label="AAA Events and Production">
                            <span className="logoA red">A</span>
                            <span className="logoA gold">A</span>
                            <span className="logoA gold">A</span>
                        </div>

                        <p className="companyName">EVENTS &amp; PRODUCTION</p>

                        <div className="thinRule" />

                        <p className="tagline">EXPERIENCE • CREATIVITY • PERFECTION.</p>

                        <div className="heroCopy">
                            <h1>EXPERIENCE THAT BUILDS.</h1>
                            <h2>EXECUTION THAT DELIVERS.</h2>
                        </div>

                        <div className="glowRule" />

                        <div className="featureGrid">
                            {features.map((item) => (
                                <Feature key={item.title} item={item} />
                            ))}
                        </div>

                        <div className="sectionStatement">ONE TEAM. ENDLESS POSSIBILITIES.</div>

                        <div className="serviceGrid">
                            {services.map((item) => (
                                <Service key={item.title} item={item} />
                            ))}
                        </div>

                        <div className="trustLine">
                            STRUCTURAL EXCELLENCE &nbsp; | &nbsp; CERTIFIED SAFETY &nbsp; | &nbsp;
                            ENGINEERED EXECUTION
                        </div>

                        <div className="orgLine">
                            TRUSTED BY CORPORATES, INSTITUTIONS &amp; LARGE-SCALE EVENT ORGANIZERS
                            ACROSS INDIA
                        </div>
                    </div>
                </section>

                <aside className="sideColumn right">
                    {rightCards.map((item) => (
                        <SideCard key={item.title} item={item} align="right" />
                    ))}
                </aside>
            </section>

            <section className="bottomGallerySection">
                <div className="bottomRibbon">FROM CONCEPT TO CERTIFIED EXECUTION</div>

                <div className="bottomGallery">
                    {galleryImages.map((src, i) => (
                        <div className="galleryItem" key={src}>
                            <img src={src} alt={`AAA gallery ${i + 1}`} />
                        </div>
                    ))}
                </div>

                <div className="bottomNav">
                    <span>PLANNING</span>
                    <span>ENGINEERING</span>
                    <span>EXECUTION</span>
                    <span>MANAGEMENT</span>
                    <span>SUPPORT</span>
                </div>
            </section>
        </main>
    );
}