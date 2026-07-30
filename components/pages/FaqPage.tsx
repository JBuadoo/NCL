"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FaqItem = {
  tag: string;
  question: string;
  answer: ReactNode;
};

const GENERAL_FAQS: FaqItem[] = [
  {
    tag: "Cost",
    question: "How much does it actually cost?",
    answer: (
      <>
        It's $25 a day ($775 a month) and that includes your furnished room, all utilities, Wi-Fi,
        laundry access, on-site management and more. There's no separate deposit stack and no
        surprise bills.
        <div className="say-this">
          Think of it like this: if you tried to piece together a room, electric, water, gas,
          Wi-Fi, and laundry on your own, you'd likely spend $1,600 to $1,800 a month. We give you
          all of it for $775.
        </div>
      </>
    ),
  },
  {
    tag: "Eligibility",
    question: "Who is New Creation Living for?",
    answer:
      "Adults who receive SSI, SSDI, VA Pension, VA Disability, or Social Security. Specifically for independent adults who can manage their own daily lives. We're not a personal care home or clinical facility, so residents need to be able to handle their own basic self-care.",
  },
  {
    tag: "Timeline",
    question: "How fast can someone move in?",
    answer:
      "Most approved applicants move in within 24 to 48 hours. There's no months-long waitlist like traditional affordable housing or Section 8.",
  },
  {
    tag: "Comparison",
    question:
      "Is New Creation Living (NCL) a Personal Care Home(PCH) or a nursing home? If not, what are the differences?",
    answer:
      "New Creation Living provides all-inclusive housing for independent adults living on a fixed income. We are not a Personal Care Home (PCH) or a nursing home. The key difference is the level of care provided. Personal Care Homes offer housing along with assistance with activities of daily living, such as bathing, dressing, medication reminders, and meal assistance. Nursing homes provide 24/7 medical supervision and skilled nursing care for individuals with chronic illnesses or complex medical needs. Our residents are able to live independently and do not require personal care services or skilled nursing. As a result, New Creation Living operates as an independent, all-inclusive housing provider, not as a Personal Care Home or nursing home.",
  },
  {
    tag: "Benefits",
    question: "What if I don't have my benefits approved yet?",
    answer:
      "That's not a dead end. We work with individuals in the process of applying for SSI, SSDI, VA benefits, or Social Security at no upfront cost to you. Once approved, you'd have the income to move in.",
  },
  {
    tag: "Section 8",
    question: "Do we accept Section 8 Vouchers?",
    answer:
      'No, we do not, but we have partners whom we can refer you to. Please complete the "Apply for Residency" form.',
  },
  {
    tag: "Referrals",
    question: "I'm a social worker or discharge planner. How does referring someone work?",
    answer:
      'Use the "Apply for residency" tab above. Submit the person\'s basic information and their benefit type, and we\'ll follow up directly, usually the same day. We can place most referrals within 24 to 48 hours.',
  },
];

const COMMON_FAQS: FaqItem[] = [
  {
    tag: "Cost",
    question: '"That\'s too expensive, I can\'t afford that."',
    answer:
      "New Creation Living isn't a waitlist program or a temporary stop. It's a home. One built specifically for people who value dignity and deserve better than the bare minimum most programs offer. Government assistance can bring your rent down, but you are often forced to accept a lower standard of living, often with undesirable housing conditions. Come see it for yourself. Schedule a tour today and experience the difference in person.",
  },
  {
    tag: "Structure",
    question: '"I don\'t want to live with a bunch of rules. I like my freedom."',
    answer:
      "The structure isn't there to control you. It's there to protect you. Our points system encourages every resident to follow the same community standards, creating a safe, respectful environment where you never have to worry about who's coming and going. Most residents say the structure and sense of accountability become one of their favorite parts of living here.",
  },
  {
    tag: "Community",
    question: '"I don\'t want to share a house with strangers."',
    answer:
      "Everyone living in the house went through the same screening you would. A background check and house rules orientation. They're not random strangers; they're adults in similar situations who want the same thing you do. Sharing the home is exactly what keeps the price at $25 a day, compared to $65 a night (the average price of a motel in GA).",
  },
  {
    tag: "Location",
    question: '"Where is it? What if it\'s not near where I need to be?"',
    answer:
      "Our properties are chosen specifically for proximity to public transit, bus lines in particular, so you don't need a car to get around.",
  },
  {
    tag: "Timing",
    question: "Let me think about it. I'll get back to you.",
    answer:
      "Take all the time you need. There's no pressure. The one thing worth knowing: beds do fill up, and we can't hold a spot. The application itself is free, takes about two minutes, and doesn't commit you to anything.",
  },
];

function Accordion({
  item,
  tagClass,
  open,
  onToggle,
}: {
  item: FaqItem;
  tagClass: "general" | "common";
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (open && bodyRef.current) {
      setMaxHeight(bodyRef.current.scrollHeight + 40 + "px");
    } else {
      setMaxHeight(undefined);
    }
  }, [open]);

  return (
    <div className={`accordion${open ? " open" : ""}`}>
      <button className="accordion-head" onClick={onToggle}>
        <div>
          <span className={`accordion-tag ${tagClass}`}>{item.tag}</span>
          <div className="accordion-q">{item.question}</div>
        </div>
        <div className="accordion-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
      </button>
      <div className="accordion-body" ref={bodyRef} style={{ maxHeight }}>
        <div className="accordion-body-inner">{item.answer}</div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [activeGroup, setActiveGroup] = useState<"general" | "common">("general");
  const [openIndex, setOpenIndex] = useState<{ general: number | null; common: number | null }>({
    general: null,
    common: null,
  });

  const toggle = (group: "general" | "common", index: number) => {
    setOpenIndex((prev) => ({ ...prev, [group]: prev[group] === index ? null : index }));
  };

  return (
    <div className="page" id="page-faq">
      <section className="band" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about housing, costs, benefits, and eligibility.</p>
          </div>

          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div className="faq-tabs">
              <button
                className={`faq-tab${activeGroup === "general" ? " active" : ""}`}
                onClick={() => setActiveGroup("general")}
              >
                General Questions
              </button>
              <button
                className={`faq-tab${activeGroup === "common" ? " active" : ""}`}
                onClick={() => setActiveGroup("common")}
              >
                Common Concerns
              </button>
            </div>

            <div id="faq-general" className={`faq-group${activeGroup === "general" ? " active" : ""}`}>
              {GENERAL_FAQS.map((item, index) => (
                <Accordion
                  key={item.question}
                  item={item}
                  tagClass="general"
                  open={openIndex.general === index}
                  onToggle={() => toggle("general", index)}
                />
              ))}
            </div>

            <div id="faq-common" className={`faq-group${activeGroup === "common" ? " active" : ""}`}>
              {COMMON_FAQS.map((item, index) => (
                <Accordion
                  key={item.question}
                  item={item}
                  tagClass="common"
                  open={openIndex.common === index}
                  onToggle={() => toggle("common", index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
