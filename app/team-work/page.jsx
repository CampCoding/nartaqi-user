"use client";

import React, { useMemo } from "react";
import PagesBanner from "./../../components/ui/PagesBanner";
import WorkMemperCard from "./../../components/ui/Cards/WorkMemperCard";
import Container from "../../components/ui/Container";
import { useTeam } from "../../components/shared/Hooks/useGetTeam";


  // ✅ ترجمة اختيارية لبعض القيم المعروفة (لو ظهرت)
const CATEGORY_LABELS = {
  administrators: "إداريين",
  admin: "إداريين",
  technicians: "الفنيين",
  technician: "الفنيين",
  support: "الدعم الفني",
  helpdesk: "الدعم الفني",
  data_entry: "إدخال البيانات",
  dataentry: "إدخال البيانات",
};

// ✅ normalize: يحول أي category (عربي/إنجليزي/مسافات/حروف كبيرة) لمفتاح ثابت
const normalizeCategoryKey = (value) => {
  const raw = String(value ?? "").trim();
  if (!raw) return "uncategorized";

  // لو عربي أو إنجليزي، هنخلي المفتاح lowercase ونستبدل المسافات بـ _
  return raw
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\u0600-\u06FF_]+/g, ""); // يسمح بالعربي + _ + الأرقام
};

// ✅ عنوان القسم: لو فيه ترجمة جاهزة استخدمها، وإلا اعرض النص الأصلي (fallback محترم)
const getCategoryTitle = (originalValue, key) => {
  // لو المفتاح معروف في labels
  if (CATEGORY_LABELS[key]) return CATEGORY_LABELS[key];

  const raw = String(originalValue ?? "").trim();
  if (!raw) return "أخرى";

  // لو النص بالعربي اعرضه كما هو، لو انجليزي اعرضه بشكل لطيف
  if (/[\u0600-\u06FF]/.test(raw)) return raw;

  // Title Case للإنجليزي
  return raw
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

// ✅ لون ثابت لكل category (deterministic) بدون ما تعرفه مسبقًا
const colorFromString = (str) => {
  const s = String(str || "uncategorized");
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;

  // HSL -> Hex (نعملها بسيطه)
  const hue = hash % 360;
  const sat = 78; // ثابتة
  const light = 50; // ثابتة

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
    else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
    else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
    else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
    else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return hslToHex(hue, sat, light);
};



// ✅ ماب ألوان ثابتة حسب category القادمة من الـ API
const CATEGORY_META = {
  administrators: { title: "إداريين", color: "#F97316" },
  technicians: { title: "الفنيين", color: "#3B82F6" },
  support: { title: "الدعم الفني", color: "#572808" },
  data_entry: { title: "إدخال البيانات", color: "#193767" },
  uncategorized: { title: "أخرى", color: "#64748B" },
};

const TeamWorkPage = () => {
  const { visibleTeam, loading, error, refetch } = useTeam();

  const teamSections = useMemo(() => {
    const groups = {}; // { key: { original, members: [] } }
  
    for (const m of visibleTeam) {
      const original = m?.category;
      const key = normalizeCategoryKey(original);
  
      if (!groups[key]) groups[key] = { original, members: [] };
      groups[key].members.push(m);
    }
  
    const sections = Object.entries(groups).map(([key, group]) => {
      const title = getCategoryTitle(group.original, key);
      const color = colorFromString(key);
  
      return {
        key,          // ✅ مهم للترتيب/keys
        title,
        color,
        members: group.members.map((x) => ({
          name: x?.name || "",
          email: x?.email || "",
          role: x?.role || "",
          image: x?.image || "/images/avatar-fallback.png",
        })),
      };
    });
  
    // ✅ ترتيب افتراضي: الأقسام المعروفة أولاً ثم الباقي أبجدي
    const preferredOrder = ["administrators", "technicians", "support", "data_entry"];
    sections.sort((a, b) => {
      const ai = preferredOrder.indexOf(a.key);
      const bi = preferredOrder.indexOf(b.key);
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
      return a.title.localeCompare(b.title, "ar");
    });
  
    return sections;
  }, [visibleTeam]);
  
  return (
    <div>
      <PagesBanner
        variant="normal"
        image={"/images/team-work.png"}
        title={"فريق العمل"}
        breadcrumb={[
          { title: "الرئيسية", link: "/" },
          { title: "فريق العمل", link: "/" },
        ]}
      />

      <Container className="mt-[48px] mb-[100px] flex flex-col gap-[48px]">
        {/* ✅ حالات التحميل/الخطأ */}
        {loading && (
          <div className="py-10 text-center text-gray-600">
            جاري تحميل فريق العمل...
          </div>
        )}

        {!loading && error && (
          <div className="py-10 text-center">
            <p className="text-red-600 mb-3">حدث خطأ: {error}</p>
            <button
              onClick={refetch}
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {!loading && !error && teamSections.length === 0 && (
          <div className="py-10 text-center text-gray-600">
            لا يوجد أعضاء فريق حالياً.
          </div>
        )}

        {!loading &&
          !error &&
          teamSections.map((item) => <Section data={item} key={item.key} />          )}
      </Container>
    </div>
  );
};

export default TeamWorkPage;

const Section = ({ data }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 lg:gap-[32px]">
      <div
        className="px-10 md:px-8 py-4 lg:px-[80px] rounded-[25px] flex justify-center items-center"
        style={{ background: data.color ?? "#F97316" }}
      >
        <div className="text-center justify-center text-white text-xl lg:text-[24px] font-bold leading-normal lg:leading-[48px]">
          {data.title}
        </div>
      </div>

      <div className="flex justify-center gap-6 lg:gap-[40px] flex-wrap">
        {data?.members?.map((item, index) => (
          <WorkMemperCard data={item} color={data.color} key={index} />
        ))}
      </div>
    </div>
  );
};
