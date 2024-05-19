import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-20">
        <h1 className="text-xl font-bold">
          <Link href="/">TaskTimeGuardian</Link>
        </h1>
        <nav>
          <Link href="/task/list" className="ml-4 hover:underline">
            タスク一覧
          </Link>
          <Link href="/qa_archive/list" className="ml-4 hover:underline">
            QA一覧
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
