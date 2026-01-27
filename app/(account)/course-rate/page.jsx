// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { ConfigProvider, Select, Progress, Tabs, Empty } from "antd";
// import { DownOutlined, BookOutlined, VideoCameraOutlined, TrophyOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// // Adjust path as needed
// import useRoundCompletenessRoundByRoundID from "../../../components/shared/Hooks/useGetMyCompeletenessRoundByRoundID";
// import useUserCourses from "../../../components/shared/Hooks/useGetMyCourses";

// export default function CompletionRatePage() {
//   const { token } = useSelector((s) => s.auth);

//   // 1) User courses
//   const {
//     rounds,
//     loading: coursesLoading,
//     error: coursesError,
//     refetch: refetchCourses,
//   } = useUserCourses(token, {
//     autoFetch: true,
//     baseUrl: "https://camp-coding.site/nartaqi/public",
//   });

//   // 2) Select round_id
//   const [courseId, setCourseId] = useState(null);

//   const coursesOptions = useMemo(() => {
//     const getId = (r) => r?.round_id ?? r?.id ?? r?.roundId;
//     const getLabel = (r) =>
//       r?.round_name ?? r?.name ?? r?.title ?? `دورة رقم ${getId(r)}`;

//     return (rounds || [])
//       .map((r) => {
//         const id = getId(r);
//         if (id == null) return null;
//         return { value: String(id), label: getLabel(r) };
//       })
//       .filter(Boolean);
//   }, [rounds]);

//   useEffect(() => {
//     if (!courseId && coursesOptions.length) {
//       setCourseId(coursesOptions[0].value);
//     }
//   }, [courseId, coursesOptions]);

//   // 3) Completeness hook
//   const {
//     message,
//     basicItems,
//     lectureItems,
//     fullRoundItems,
//     loading: compLoading,
//     error: compError,
//     refetch: refetchCompleteness,
//   } = useRoundCompletenessRoundByRoundID(courseId, {
//     token,
//     enabled: false, // manual fetch
//     bearer: true,
//   });

//   const onSubmit = async () => {
//     if (!courseId) return;
//     await refetchCompleteness(courseId);
//   };

//   // Tabs Items Configuration
//   const tabItems = [
//     {
//       key: "basic",
//       label: (
//         <span className="flex items-center gap-2">
//           <BookOutlined /> الأساسيات
//         </span>
//       ),
//       children: <ExamListComponent items={basicItems} emptyText="لا توجد أساسيات في هذه الدورة" />,
//     },
//     {
//       key: "lecture",
//       label: (
//         <span className="flex items-center gap-2">
//           <VideoCameraOutlined /> المحاضرات
//         </span>
//       ),
//       children: <ExamListComponent items={lectureItems} emptyText="لا توجد محاضرات في هذه الدورة" />,
//     },
//     {
//       key: "full_round",
//       label: (
//         <span className="flex items-center gap-2">
//           <TrophyOutlined /> الدورة الكاملة
//         </span>
//       ),
//       children: <ExamListComponent items={fullRoundItems} emptyText="لا توجد اختبارات شاملة" />,
//     },
//   ];

//   return (
//     <ConfigProvider
//       direction="rtl"
//       theme={{
//         token: {
//           colorPrimary: "#2563eb",
//           borderRadius: 14,
//           fontFamily:
//             "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
//         },
//       }}
//     >
//       <div dir="rtl" className="min-h-screen bg-slate-50">
//         <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14">
//           <header className="text-center">
//             <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
//               معدل الإنجاز
//             </h1>
//           </header>

//           <section className="mt-10 sm:mt-12">
//             {/* Control Card */}
//             <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/75 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
//               <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
              
//               <div className="p-5 sm:p-8">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:items-center">
//                   <div className="text-right">
//                     <div className="text-sm font-bold text-slate-700">
//                       اختر الدورة
//                     </div>
//                     <div className="mt-1 text-xs text-slate-500">
//                       اختر الدورة لعرض نسبة الإنجاز
//                     </div>
//                   </div>

//                   <div className="relative">
//                     <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md">
//                       <Select
//                         value={courseId}
//                         onChange={setCourseId}
//                         options={coursesOptions}
//                         showSearch
//                         optionFilterProp="label"
//                         placeholder={token ? "اختر الدورة" : "سجّل الدخول أولًا"}
//                         suffixIcon={<DownOutlined />}
//                         style={{ width: "100%" }}
//                         size="large"
//                         loading={coursesLoading}
//                         disabled={!token || coursesLoading}
//                       />
//                     </div>

//                     <div className="mt-2 flex items-center justify-between">
//                       <button
//                         type="button"
//                         onClick={refetchCourses}
//                         className="text-xs font-bold text-slate-500 hover:text-slate-700"
//                       >
//                         تحديث القائمة
//                       </button>
//                     </div>

//                     {coursesError && (
//                       <div className="mt-2 text-right text-xs font-semibold text-red-600">
//                         {coursesError}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-center">
//                   <button
//                     onClick={onSubmit}
//                     disabled={!courseId || compLoading}
//                     className="group relative inline-flex items-center justify-center rounded-2xl bg-blue-600 px-10 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
//                   >
//                      {compLoading ? "جارِ العرض..." : "عرض النتائج"}
//                   </button>
//                 </div>

//                 {compError && (
//                   <div className="mt-3 text-center text-sm font-semibold text-red-600">
//                     {compError.message || String(compError)}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Results UI */}
//             {message ? (
//               <div className="mt-8 space-y-6">
                
//                 {/* 1. Statistics Cards */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                   <StatCard
//                     title="الأساسيات"
//                     value={message.basic_percentage}
//                     hint="نسبة إنجاز الأساسيات"
//                     color="blue"
//                   />
//                   <StatCard
//                     title="المحاضرات"
//                     value={message.lecture_percentage}
//                     hint="نسبة إنجاز المحاضرات"
//                     color="purple"
//                   />
//                   <StatCard
//                     title="الدورة الكاملة"
//                     value={message.full_round_percentage}
//                     hint="نسبة إنجاز الشامل"
//                     color="green"
//                   />
//                 </div>

//                 {/* 2. Main Details with Tabs */}
//                 <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur">
//                   <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
//                     <div className="text-lg font-bold text-slate-800">
//                       تفاصيل المحتوى
//                     </div>
//                     <div className="flex flex-col items-end gap-1">
//                       <div className="text-xs font-semibold text-slate-500">
//                          الإجمالي: {formatPercentLabel(message.total_percentage)}
//                       </div>
//                        <div className="w-32">
//                         <PercentProgress value={message.total_percentage} />
//                        </div>
//                     </div>
//                   </div>

//                   {/* Tabs Component to separate items */}
//                   <Tabs 
//                     defaultActiveKey="basic" 
//                     items={tabItems} 
//                     type="card"
//                     size="large"
//                     className="custom-tabs"
//                   />
//                 </div>
//               </div>
//             ) : null}
//           </section>
//         </div>
//       </div>
//     </ConfigProvider>
//   );
// }

// /* ------------------------------------------
//    Sub-Components
// ------------------------------------------ */

// function ExamListComponent({ items, emptyText }) {
//   if (!items || items.length === 0) {
//     return <Empty description={emptyText} className="py-10" />;
//   }

//   return (
//     <div className="space-y-3 mt-4">
//       {items.map((it) => (
//         <div
//           key={`${it.type}-${it.exam_id}`}
//           className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-blue-300 hover:shadow-md"
//         >
//           <div className="text-right">
//             <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
//               {it.exam_name}
//             </div>
//             <div className="mt-1 flex items-center gap-2 text-xs">
//               <span className={`px-2 py-0.5 rounded-full font-bold ${it.solved ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
//                 {it.solved ? "محلول" : "غير محلول"}
//               </span>
//               <span className="text-slate-400">|</span>
//               <span className="text-slate-500">
//                 {mapTypeToArabic(it.type)}
//               </span>
//             </div>
//           </div>

//           <div className="min-w-[140px] text-left sm:text-left">
//             <div className="flex items-center justify-end sm:justify-start gap-2 mb-1">
//               <span className="text-xs text-slate-400">أعلى درجة:</span>
//               <span className="font-extrabold text-slate-900 text-lg">
//                 {formatPercentLabel(it.highest_score)}
//               </span>
//             </div>
//             <PercentProgress value={it.highest_score} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function StatCard({ title, value, hint, color }) {
//   // Simple mapping for colors if you want dynamic styling
//   return (
//     <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
//       <div className="text-sm font-bold text-slate-700">{title}</div>
//       <div className="mt-3 flex items-end justify-between">
//         <div className="text-3xl font-extrabold text-slate-900">
//           {formatPercentLabel(value) ?? "—"}
//         </div>
//       </div>
//       <div className="mt-3">
//         <PercentProgress value={value} />
//       </div>
//       <div className="mt-2 text-xs text-slate-400">{hint}</div>
//     </div>
//   );
// }

// function PercentProgress({ value }) {
//   const p = parsePercent(value);
//   if (p == null) {
//     return <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>;
//   }
  
//   // Dynamic color based on score
//   let strokeColor = "#3b82f6"; // blue-500
//   if(p >= 90) strokeColor = "#10b981"; // emerald-500
//   else if (p < 50) strokeColor = "#ef4444"; // red-500

//   return (
//     <Progress
//       percent={p}
//       showInfo={false}
//       strokeColor={strokeColor}
//       strokeLinecap="round"
//       size="small"
//       trailColor="#f1f5f9"
//     />
//   );
// }

// /* ------------------------------------------
//    Helpers
// ------------------------------------------ */

// function parsePercent(value) {
//   if (value == null) return null;
//   if (typeof value === "string") {
//     const v = value.trim();
//     const num = Number(v.replace("%", ""));
//     if (!Number.isFinite(num)) return null;
//     return clamp(Math.round(num), 0, 100);
//   }
//   if (typeof value === "number") {
//     if (!Number.isFinite(value)) return null;
//     return clamp(Math.round(value), 0, 100);
//   }
//   return null;
// }

// function formatPercentLabel(value) {
//   const p = parsePercent(value);
//   return p == null ? (value ?? "0%") : `${p}%`;
// }

// function clamp(n, min, max) {
//   return Math.min(max, Math.max(min, n));
// }

// function mapTypeToArabic(type) {
//   const t = String(type || "").toLowerCase();
//   if (t === "basic") return "أساسي";
//   if (t === "lecture") return "محاضرة";
//   if (t === "full_round") return "شامل";
//   return type || "—";
// }

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Select, Progress, Empty, Divider } from "antd";
import { 
  DownOutlined, 
  BookOutlined, 
  VideoCameraOutlined, 
  TrophyOutlined 
} from "@ant-design/icons";
import { useSelector } from "react-redux";
// Make sure path is correct
import useRoundCompletenessRoundByRoundID from "../../../components/shared/Hooks/useGetMyCompeletenessRoundByRoundID";
import useUserCourses from "../../../components/shared/Hooks/useGetMyCourses";

export default function CompletionRatePage() {
  const { token } = useSelector((s) => s.auth);

  // 1) Get Courses
  const {
    rounds,
    loading: coursesLoading,
    error: coursesError,
    refetch: refetchCourses,
  } = useUserCourses(token, {
    autoFetch: true,
    baseUrl: "https://camp-coding.site/nartaqi/public",
  });

  // 2) Selection State
  const [courseId, setCourseId] = useState(null);

  const coursesOptions = useMemo(() => {
    const getId = (r) => r?.round_id ?? r?.id ?? r?.roundId;
    const getLabel = (r) =>
      r?.round_name ?? r?.name ?? r?.title ?? `دورة رقم ${getId(r)}`;

    return (rounds || [])
      .map((r) => {
        const id = getId(r);
        if (id == null) return null;
        return { value: String(id), label: getLabel(r) };
      })
      .filter(Boolean);
  }, [rounds]);

  // Select first course by default
  useEffect(() => {
    if (!courseId && coursesOptions.length) {
      setCourseId(coursesOptions[0].value);
    }
  }, [courseId, coursesOptions]);

  // 3) Hook with Separated Data
  const {
    message,
    basicItems,
    lectureItems,
    fullRoundItems,
    loading: compLoading,
    error: compError,
    refetch: refetchCompleteness,
  } = useRoundCompletenessRoundByRoundID(courseId, {
    token,
    enabled: false, // Wait for manual click
    bearer: true,
  });

  const onSubmit = async () => {
    if (!courseId) return;
    await refetchCompleteness(courseId);
  };

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 14,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        },
      }}
    >
      <div dir="rtl" className="min-h-screen bg-slate-50">
        <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14">
          
          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
              معدل الإنجاز
            </h1>
          </header>

          {/* Control Section */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="flex-1">
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    اختر الدورة
                  </label>
                  <Select
                    value={courseId}
                    onChange={setCourseId}
                    options={coursesOptions}
                    placeholder="اختر الدورة..."
                    size="large"
                    className="w-full"
                    suffixIcon={<DownOutlined />}
                    loading={coursesLoading}
                    disabled={!token || coursesLoading}
                  />
                  {coursesError && (
                     <div className="mt-1 text-xs text-red-600">{coursesError}</div>
                  )}
                </div>
                
                <button
                  onClick={onSubmit}
                  disabled={!courseId || compLoading}
                  className="h-[40px] rounded-xl bg-blue-600 px-8 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {compLoading ? "جارِ التحميل..." : "عرض النتائج"}
                </button>
              </div>

              {compError && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm font-semibold text-red-600">
                  {compError.message || String(compError)}
                </div>
              )}
            </div>
          </div>

          {/* RESULTS AREA */}
          {message ? (
            <div className="mt-8 space-y-8 animate-fadeIn">
              
              {/* 1. Summary Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                  title="تدريبات التأسيس"
                  value={message.basic_percentage}
                  color="blue"
                />
                <StatCard
                  title=" تدريبات المحاضرات"
                  value={message.lecture_percentage}
                  color="purple"
                />
                <StatCard
                  title="الاختبارات"
                  value={message.full_round_percentage}
                  color="green"
                />
              </div>

              {/* Total Progress Bar */}
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-bold text-slate-700">إجمالي نسبة الإنجاز في الدورة:</span>
                <div className="flex items-center gap-3 w-full sm:w-1/2">
                   <PercentProgress value={message.total_percentage} height={12} />
                   <span className="font-extrabold text-slate-800">{formatPercentLabel(message.total_percentage)}</span>
                </div>
              </div>

              <Divider className="border-slate-200">تفاصيل المحتوى</Divider>

              {/* 2. Stacked Sections */}
              
              {/* SECTION: BASIC */}
              <ContentSection
                title="تدريبات التأسيس"
                icon={<BookOutlined className="text-blue-500" />}
                items={basicItems}
                emptyText="لا توجد أساسيات في هذه الدورة"
              />

              {/* SECTION: LECTURE */}
              <ContentSection
                title="تدريبات المحاضرات"
                icon={<VideoCameraOutlined className="text-purple-500" />}
                items={lectureItems}
                emptyText="لا توجد محاضرات في هذه الدورة"
              />

              {/* SECTION: FULL ROUND */}
              <ContentSection
                title="الاختبارات"
                icon={<TrophyOutlined className="text-yellow-500" />}
                items={fullRoundItems}
                emptyText="لا توجد اختبارات شاملة"
              />

            </div>
          ) : null}
        </div>
      </div>
    </ConfigProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                SUB-COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// 1. Reusable Section Container
function ContentSection({ title, icon, items, emptyText }) {
  const hasItems = items && items.length > 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-lg">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        <span className="mr-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
          {items?.length || 0} عنصر
        </span>
      </div>

      {/* Body */}
      {hasItems ? (
        <div className="grid grid-cols-1 gap-3">
          {items.map((it, idx) => (
            <ExamItemRow key={`${it.exam_id}-${idx}`} item={it} />
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyText} className="my-6" />
      )}
    </div>
  );
}

// 2. Individual Item Row
function ExamItemRow({ item }) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 px-5 py-4 transition hover:bg-white hover:shadow-md hover:border-blue-200">
      
      {/* Right Side: Info */}
      <div className="text-right">
        <div className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors text-base">
          {item.exam_name}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs">
          {/* Status Badge */}
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold ${
              item.solved
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.solved ? "تم الحل" : "لم يتم الحل"}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-500">
            {mapTypeToArabic(item.type)}
          </span>
        </div>
      </div>

      {/* Left Side: Score & Progress */}
      <div className="w-full sm:w-[180px] text-left">
        <div className="mb-1 flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400">أعلى درجة</span>
          <span className="font-extrabold text-slate-900 text-lg">
            {formatPercentLabel(item.highest_score)}
          </span>
        </div>
        <PercentProgress value={item.highest_score} />
      </div>
    </div>
  );
}

// 3. Stats Summary Card
function StatCard({ title, value, color }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="text-sm font-bold text-slate-500">{title}</div>
        <div className="mt-2 text-3xl font-extrabold text-slate-900">
          {formatPercentLabel(value)}
        </div>
      </div>
      <div className="mt-4">
        <PercentProgress value={value} />
      </div>
    </div>
  );
}

// 4. Progress Bar Wrapper
function PercentProgress({ value, height = 8 }) {
  const p = parsePercent(value);
  
  if (p == null) {
    return <div className="h-2 w-full bg-slate-100 rounded-full" />;
  }

  // Color logic
  let color = "#3b82f6"; 
  if (p >= 90) color = "#10b981"; // green
  else if (p < 50) color = "#ef4444"; // red

  return (
    <Progress
      percent={p}
      showInfo={false}
      strokeColor={color}
      strokeLinecap="round"
      trailColor="#f1f5f9"
      size="small"
      style={{ margin: 0 }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function parsePercent(value) {
  if (value == null) return null;
  if (typeof value === "string") {
    const v = value.trim();
    const num = Number(v.replace("%", ""));
    if (!Number.isFinite(num)) return null;
    return clamp(Math.round(num), 0, 100);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    return clamp(Math.round(value), 0, 100);
  }
  return null;
}

function formatPercentLabel(value) {
  const p = parsePercent(value);
  return p == null ? (value ?? "0%") : `${p}%`;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function mapTypeToArabic(type) {
  const t = String(type || "").toLowerCase();
  if (t === "basic") return "أساسي";
  if (t === "lecture") return "محاضرة";
  if (t === "full_round") return "شامل";
  return type || "—";
}