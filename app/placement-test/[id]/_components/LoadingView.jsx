// app/placement-test/[id]/components/LoadingView.jsx

import Container from "@/components/ui/Container";

const LoadingView = ({ message = "جاري تحميل الاختبار..." }) => {
  return (
    <div className="min-h-[calc(100vh-133px)] bg-gray-50 flex items-center justify-center">
      <Container>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">{message}</p>
        </div>
      </Container>
    </div>
  );
};

export default LoadingView;
