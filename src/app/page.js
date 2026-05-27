import { redirect } from 'next/navigation';

export default function Home() {
  // Langsung arahkan halaman utama ke dashboard admin
  redirect('/admin/dashboard');
}
