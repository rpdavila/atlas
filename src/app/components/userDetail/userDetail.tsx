import { getAvailableInstrumentCount, getAvailableInstrumentCountByDistrict } from "@/actions/actions";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function UserDetail() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signIn");
  }

  const instrumentCountSchoolWide = await getAvailableInstrumentCount(session.user.id as string)
  const instrumentCountDistrict = await getAvailableInstrumentCountByDistrict(session.user.id as string)
  // Ensure the counts are numbers, defaulting to 0 if they are not
  // This is to handle cases where the counts might be undefined or null  
  const schoolCount = typeof instrumentCountSchoolWide === 'number' ? instrumentCountSchoolWide : 0;
  const districtCount = typeof instrumentCountDistrict === 'number' ? instrumentCountDistrict : 0;

  return (
    <section className="flex flex-col justify-center items-center min-h-[60vh] bg-slate-100 rounded-lg p-8 shadow-lg border border-slate-600">
      <div className="text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-600 mb-8">
          Hello, {session.user.name}
        </h1>
        
        <div className="bg-slate-300 rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-500 border-b border-slate-900 pb-3">
            Instrument Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-400 rounded-lg p-4 text-center">
              <dt className="text-sm font-medium text-slate-300 mb-2">School Wide Available</dt>
              <dd className="text-3xl font-bold text-slate-300">{schoolCount}</dd>
            </div>
            
            <div className="bg-slate-400 rounded-lg p-4 text-center">
              <dt className="text-sm font-medium text-slate-300 mb-2">District Wide Available</dt>
              <dd className="text-3xl font-bold text-slate-300">{districtCount - schoolCount}</dd>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
