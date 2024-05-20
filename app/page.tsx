import LoginForm from "./(login)/login-form";

export default function Home() {
  return (
    <main className="bg-neutral-50 h-screen">
      <div className="flex h-full">
        <div className="max-sm:w-screen max-sm:mx-5 w-96 m-auto">
          <LoginForm/>
        </div>
      </div>
    </main>
  );
}
