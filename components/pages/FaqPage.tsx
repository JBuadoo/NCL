"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCopy } from "@/components/SiteContentProvider";

type FaqItem = {
  tag: string;
  question: string;
  answer: ReactNode;
};

function buildFaqItems(
  copy: (key: string) => string,
  prefix: "faq.g" | "faq.c",
  count: number
): FaqItem[] {
  return Array.from({ length: count }, (_, index) => {
    const id = `${prefix}${index + 1}`;
    const sayThis = copy(`${id}.say_this`);
    return {
      tag: copy(`${id}.tag`),
      question: copy(`${id}.question`),
      answer: (
        <>
          {copy(`${id}.answer`)}
          {sayThis ? <div className="say-this">{sayThis}</div> : null}
        </>
      ),
    };
  }).filter((item) => item.question.trim());
}

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
  const copy = useCopy();
  const generalFaqs = buildFaqItems(copy, "faq.g", 7);
  const commonFaqs = buildFaqItems(copy, "faq.c", 5);
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
            <span className="eyebrow">{copy("faq.eyebrow")}</span>
            <h2>{copy("faq.title")}</h2>
            <p>{copy("faq.body")}</p>
          </div>

          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div className="faq-tabs">
              <button
                className={`faq-tab${activeGroup === "general" ? " active" : ""}`}
                onClick={() => setActiveGroup("general")}
              >
                {copy("faq.tab_general")}
              </button>
              <button
                className={`faq-tab${activeGroup === "common" ? " active" : ""}`}
                onClick={() => setActiveGroup("common")}
              >
                {copy("faq.tab_common")}
              </button>
            </div>

            <div id="faq-general" className={`faq-group${activeGroup === "general" ? " active" : ""}`}>
              {generalFaqs.map((item, index) => (
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
              {commonFaqs.map((item, index) => (
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
