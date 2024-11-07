export default function AssignmentAndTracking() {
  return (
    <article className="flex flex-col place-items-start mb-5 h-full bg-slate-50 rounded-lg mt-2">
      <section className="flex flex-col justify-evenly place-items-start h-screen m-5">
        <h3 className="text-lg underline ">
          <strong>Managing a Music Classroom Inventory and Assigning Instruments</strong>
        </h3>
        <h4 className="text-xl underline">Instrument Assignment</h4>
        <ol className="flex flex-col items-start justify-evenly">
          <li>
            <strong>Login and Access:</strong>
            A teacher logs into the Crescendo Cloud dashboard and navigates to the &quot;Student Assignments&quot; section.
          </li>
          <li>
            <strong>Student Selection:</strong>
            Selects a student from the class roster.
          </li>
          <li>
            <strong>Instrument Assignment:</strong>
            Chooses an available instrument from the classroom inventory, assigns it to the student, and sets a return date.
          </li>
          <li>
            <strong>Tracking:</strong>
            The system updates the instruments status to &quot;Assigned&quot; and logs the assignment details, including the student&apos;s name, assignment date, and return date.
          </li>
        </ol>

        <h4 className="text-xl underline">District-Wide Inventory Management</h4>
        <ol className="flex flex-col items-start">
          <li><strong>District Access:</strong> A teacher logs in and navigates to the &quot;District Inventory&quot; section.</li>
          <li><strong>Inter-School Viewing:</strong> Views inventories of other schools within the district, checking for available resources that might be needed.</li>
          <li><strong>Resource Sharing:</strong> Sends a request to another school to borrow specific instruments, facilitating inter-district collaboration.</li>
          <li><strong>Transfer Coordination:</strong> Coordinates the transfer of instruments, updating the system to reflect the new assignments.</li>
        </ol>
      </section>
    </article>
  )
}