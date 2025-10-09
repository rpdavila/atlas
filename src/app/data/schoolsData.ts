interface SchoolData{
  state: {
    name: string;
    district: {
      key: string;
      name: string;
      schools: { key: string; name: string }[];
    }[];
  }  
}

export const schoolsData: SchoolData[] = [
  {
    state: {
      name: "New Jersey",
      district: [
        {
          key: "Atlantic City School District",
          name: "Atlantic City School District", 
          schools: [
            { key: "Atlantic City High School", name: "Atlantic City High School" },
            { key: "Uptown School Complex", name: "Uptown School Complex" },
            { key: "New York Avenue School", name: "New York Avenue School" },
            { key: "Pennsylvania Avenue School", name: "Pennsylvania Avenue School" },
            { key: "Dr. Martin Luther King Jr. School Complex", name: "Dr. Martin Luther King Jr. School Complex" },
            { key: "Venice Park School", name: "Venice Park School" },
            { key: "Chelsea Heights School", name: "Chelsea Heights School" },
            { key: "Richmond Avenue School", name: "Richmond Avenue School" },
            { key: "Texas Avenue School", name: "Texas Avenue School" },
            { key: "Brighton Avenue School", name: "Brighton Avenue School" }
          ]
        },
        {
          key: "Bergen County Technical Schools",
          name: "Bergen County Technical Schools",
          schools: [
            { key: "Bergen County Academies", name: "Bergen County Academies" },
            { key: "Bergen County Technical High School - Teterboro", name: "Bergen County Technical High School - Teterboro" },
            { key: "Bergen County Technical High School - Paramus", name: "Bergen County Technical High School - Paramus" },
            { key: "Applied Technology High School", name: "Applied Technology High School" },
            { key: "Bergen Arts and Science Charter School", name: "Bergen Arts and Science Charter School" }
          ]
        },
        {
          key: "Burlington Township School District",
          name: "Burlington Township School District",
          schools: [
            { key: "Burlington Township High School", name: "Burlington Township High School" },
            { key: "Burlington Township Middle School", name: "Burlington Township Middle School" },
            { key: "Burlington Township Elementary School", name: "Burlington Township Elementary School" },
            { key: "B. Bernice Young Elementary School", name: "B. Bernice Young Elementary School" }
          ]
        },
        {
          key: "Camden City School District",
          name: "Camden City School District",
          schools: [
            { key: "Camden High School", name: "Camden High School" },
            { key: "Woodrow Wilson High School", name: "Woodrow Wilson High School" },
            { key: "Creative Arts Morgan Village Academy", name: "Creative Arts Morgan Village Academy" },
            { key: "Brimm Medical Arts High School", name: "Brimm Medical Arts High School" },
            { key: "Big Picture Learning Academy", name: "Big Picture Learning Academy" },
            { key: "Camden Academy Charter High School", name: "Camden Academy Charter High School" },
            { key: "LEAP Academy University Charter School", name: "LEAP Academy University Charter School" },
            { key: "MetEast High School", name: "MetEast High School" },
            { key: "Pride Academy", name: "Pride Academy" }
          ]
        },
        {
          key: "Cherry Hill Public Schools",
          name: "Cherry Hill Public Schools",
          schools: [
            { key: "Cherry Hill High School East", name: "Cherry Hill High School East" },
            { key: "Cherry Hill High School West", name: "Cherry Hill High School West" },
            { key: "Beck Middle School", name: "Beck Middle School" },
            { key: "Carusi Middle School", name: "Carusi Middle School" },
            { key: "Rosa International Middle School", name: "Rosa International Middle School" },
            { key: "Barclay Elementary School", name: "Barclay Elementary School" },
            { key: "Clara Barton Elementary School", name: "Clara Barton Elementary School" },
            { key: "James F. Cooper Elementary School", name: "James F. Cooper Elementary School" },
            { key: "Joyce Kilmer Elementary School", name: "Joyce Kilmer Elementary School" },
            { key: "Kingston Elementary School", name: "Kingston Elementary School" },
            { key: "Mann Elementary School", name: "Mann Elementary School" },
            { key: "Stockton Elementary School", name: "Stockton Elementary School" }
          ]
        },
        {
          key: "Elizabeth Public Schools",
          name: "Elizabeth Public Schools",
          schools: [
            { key: "Elizabeth High School", name: "Elizabeth High School" },
            { key: "Admiral William F. Halsey Jr. Health & Public Safety Academy", name: "Admiral William F. Halsey Jr. Health & Public Safety Academy" },
            { key: "John E. Dwyer Technology Academy", name: "John E. Dwyer Technology Academy" },
            { key: "Thomas Jefferson Arts Academy", name: "Thomas Jefferson Arts Academy" },
            { key: "Alexander Hamilton Preparatory Academy", name: "Alexander Hamilton Preparatory Academy" },
            { key: "Nicholas Murray Butler School No. 23", name: "Nicholas Murray Butler School No. 23" },
            { key: "Terence C. Reilly School No. 7", name: "Terence C. Reilly School No. 7" },
            { key: "Dr. Albert Einstein Academy School No. 29", name: "Dr. Albert Einstein Academy School No. 29" },
            { key: "William F. Halloran School No. 22", name: "William F. Halloran School No. 22" },
            { key: "Mabel G. Holmes School No. 5", name: "Mabel G. Holmes School No. 5" }
          ]
        },
        {
          key: "Freehold Regional High School District",
          name: "Freehold Regional High School District",
          schools: [
            { key: "Freehold High School", name: "Freehold High School" },
            { key: "Freehold Township High School", name: "Freehold Township High School" },
            { key: "Howell High School", name: "Howell High School" },
            { key: "Manalapan High School", name: "Manalapan High School" },
            { key: "Marlboro High School", name: "Marlboro High School" },
            { key: "Colts Neck High School", name: "Colts Neck High School" }
          ]
        },
        {
          key: "Hamilton Township School District (Mercer)",
          name: "Hamilton Township School District (Mercer)",
          schools: [
            { key: "Hamilton High School West", name: "Hamilton High School West" },
            { key: "Hamilton High School North (Nottingham)", name: "Hamilton High School North (Nottingham)" },
            { key: "Hamilton High School East (Steinert)", name: "Hamilton High School East (Steinert)" },
            { key: "Crockett Middle School", name: "Crockett Middle School" },
            { key: "Grice Middle School", name: "Grice Middle School" },
            { key: "Reynolds Middle School", name: "Reynolds Middle School" },
            { key: "Alexander Elementary School", name: "Alexander Elementary School" },
            { key: "Greenwood Elementary School", name: "Greenwood Elementary School" },
            { key: "Kisthardt Elementary School", name: "Kisthardt Elementary School" },
            { key: "Klockner Elementary School", name: "Klockner Elementary School" },
            { key: "Kuser Elementary School", name: "Kuser Elementary School" },
            { key: "Lalor Elementary School", name: "Lalor Elementary School" },
            { key: "Langtree Elementary School", name: "Langtree Elementary School" },
            { key: "McGalliard Elementary School", name: "McGalliard Elementary School" },
            { key: "Mercerville Elementary School", name: "Mercerville Elementary School" },
            { key: "Morgan Elementary School", name: "Morgan Elementary School" },
            { key: "Robinson Elementary School", name: "Robinson Elementary School" },
            { key: "Sayen Elementary School", name: "Sayen Elementary School" },
            { key: "Sunnybrae Elementary School", name: "Sunnybrae Elementary School" },
            { key: "University Heights Elementary School", name: "University Heights Elementary School" },
            { key: "Wilson Elementary School", name: "Wilson Elementary School" },
            { key: "Yardville Elementary School", name: "Yardville Elementary School" }
          ]
        },
        {
          key: "Jersey City Public Schools",
          name: "Jersey City Public Schools",
          schools: [
            { key: "William L. Dickinson High School", name: "William L. Dickinson High School" },
            { key: "Lincoln High School", name: "Lincoln High School" },
            { key: "Liberty High School", name: "Liberty High School" },
            { key: "Ferris High School", name: "Ferris High School" },
            { key: "McNair Academic High School", name: "McNair Academic High School" },
            { key: "Snyder High School", name: "Snyder High School" },
            { key: "Innovation High School", name: "Innovation High School" },
            { key: "Renaissance Institute", name: "Renaissance Institute" },
            { key: "Academy I Middle School", name: "Academy I Middle School" },
            { key: "Academy of the Sciences", name: "Academy of the Sciences" },
            { key: "Frank R. Conwell Middle School", name: "Frank R. Conwell Middle School" },
            { key: "Franklin L. Williams Middle School", name: "Franklin L. Williams Middle School" },
            { key: "Infinity Institute", name: "Infinity Institute" },
            { key: "James F. Murray School", name: "James F. Murray School" },
            { key: "Joseph H. Brensinger School", name: "Joseph H. Brensinger School" },
            { key: "Martin Luther King Jr. School", name: "Martin Luther King Jr. School" },
            { key: "The Ethical Community Charter School", name: "The Ethical Community Charter School" },
            { key: "University Academy Charter High School", name: "University Academy Charter High School" }
          ]
        },
        {
          key: "Lakewood School District",
          name: "Lakewood School District",
          schools: [
            { key: "Lakewood High School", name: "Lakewood High School" },
            { key: "Lakewood Middle School", name: "Lakewood Middle School" },
            { key: "Clifton Avenue Grade School", name: "Clifton Avenue Grade School" },
            { key: "Ella G. Clarke Elementary School", name: "Ella G. Clarke Elementary School" },
            { key: "Oak Street School", name: "Oak Street School" },
            { key: "Piner Elementary School", name: "Piner Elementary School" },
            { key: "Spruce Street School", name: "Spruce Street School" }
          ]
        },
        {
          key: "Montclair Public Schools",
          name: "Montclair Public Schools",
          schools: [
            { key: "Montclair High School", name: "Montclair High School" },
            { key: "Glenfield Middle School", name: "Glenfield Middle School" },
            { key: "Renaissance Middle School", name: "Renaissance Middle School" },
            { key: "Buzz Aldrin Middle School", name: "Buzz Aldrin Middle School" },
            { key: "Hillside Elementary School", name: "Hillside Elementary School" },
            { key: "Bradford Elementary School", name: "Bradford Elementary School" },
            { key: "Charles H. Bullock Elementary School", name: "Charles H. Bullock Elementary School" },
            { key: "Edgemont Montessori School", name: "Edgemont Montessori School" },
            { key: "Nishuane Elementary School", name: "Nishuane Elementary School" },
            { key: "Northeast Elementary School", name: "Northeast Elementary School" },
            { key: "Watchung Elementary School", name: "Watchung Elementary School" }
          ]
        },
        {
          key: "Newark Public Schools",
          name: "Newark Public Schools",
          schools: [
            { key: "East Side High School", name: "East Side High School" },
            { key: "Central High School", name: "Central High School" },
            { key: "Science Park High School", name: "Science Park High School" },
            { key: "Technology High School", name: "Technology High School" },
            { key: "Barringer High School", name: "Barringer High School" },
            { key: "Malcolm X Shabazz High School", name: "Malcolm X Shabazz High School" },
            { key: "Weequahic High School", name: "Weequahic High School" },
            { key: "West Side High School", name: "West Side High School" },
            { key: "Arts High School", name: "Arts High School" },
            { key: "American History High School", name: "American History High School" },
            { key: "Bard High School Early College Newark", name: "Bard High School Early College Newark" },
            { key: "Eagle Academy for Young Men", name: "Eagle Academy for Young Men" },
            { key: "Newark Vocational High School", name: "Newark Vocational High School" },
            { key: "University High School", name: "University High School" },
            { key: "KIPP Newark Collegiate Academy", name: "KIPP Newark Collegiate Academy" },
            { key: "North Star Academy", name: "North Star Academy" },
            { key: "Robert Treat Academy Charter School", name: "Robert Treat Academy Charter School" }
          ]
        },
        {
          key: "Paterson Public Schools",
          name: "Paterson Public Schools",
          schools: [
            { key: "Eastside High School", name: "Eastside High School" },
            { key: "John F. Kennedy High School", name: "John F. Kennedy High School" },
            { key: "International High School", name: "International High School" },
            { key: "PANTHER Academy", name: "PANTHER Academy" },
            { key: "Rosa L. Parks School of Fine and Performing Arts", name: "Rosa L. Parks School of Fine and Performing Arts" },
            { key: "School of Education & Training at JFK", name: "School of Education & Training at JFK" },
            { key: "School of Business, Technology, Marketing & Finance at JFK", name: "School of Business, Technology, Marketing & Finance at JFK" },
            { key: "School of Science, Technology, Engineering & Mathematics at JFK", name: "School of Science, Technology, Engineering & Mathematics at JFK" },
            { key: "School of Government & Public Administration at Eastside", name: "School of Government & Public Administration at Eastside" },
            { key: "School of Culinary Arts, Hospitality & Tourism at Eastside", name: "School of Culinary Arts, Hospitality & Tourism at Eastside" },
            { key: "School of Information Technology at Eastside", name: "School of Information Technology at Eastside" },
            { key: "Great Falls Academy", name: "Great Falls Academy" },
            { key: "YES Academy", name: "YES Academy" },
            { key: "New Roberto Clemente School", name: "New Roberto Clemente School" },
            { key: "Dr. Frank Napier Jr. School of Technology", name: "Dr. Frank Napier Jr. School of Technology" },
            { key: "Alexander Hamilton Academy", name: "Alexander Hamilton Academy" },
            { key: "Edward W. Kilpatrick School", name: "Edward W. Kilpatrick School" },
            { key: "Rev. Dr. Martin Luther King Jr. School", name: "Rev. Dr. Martin Luther King Jr. School" },
            { key: "Public School No. 2", name: "Public School No. 2" },
            { key: "Public School No. 3", name: "Public School No. 3" },
            { key: "Public School No. 5", name: "Public School No. 5" },
            { key: "Public School No. 6", name: "Public School No. 6" },
            { key: "Public School No. 7", name: "Public School No. 7" },
            { key: "Public School No. 8", name: "Public School No. 8" },
            { key: "Public School No. 9", name: "Public School No. 9" },
            { key: "Public School No. 10", name: "Public School No. 10" },
            { key: "Public School No. 12", name: "Public School No. 12" },
            { key: "Public School No. 13", name: "Public School No. 13" },
            { key: "Public School No. 14", name: "Public School No. 14" },
            { key: "Public School No. 15", name: "Public School No. 15" },
            { key: "Public School No. 16", name: "Public School No. 16" },
            { key: "Public School No. 18", name: "Public School No. 18" },
            { key: "Public School No. 19", name: "Public School No. 19" },
            { key: "Public School No. 20", name: "Public School No. 20" },
            { key: "Public School No. 21", name: "Public School No. 21" },
            { key: "Public School No. 24", name: "Public School No. 24" },
            { key: "Public School No. 25", name: "Public School No. 25" },
            { key: "Public School No. 26", name: "Public School No. 26" },
            { key: "Public School No. 27", name: "Public School No. 27" },
            { key: "Public School No. 28", name: "Public School No. 28" },
            { key: "Public School No. 29", name: "Public School No. 29" },
            { key: "Public School No. 30", name: "Public School No. 30" }
          ]
        },
        {
          key: "Princeton Public Schools",
          name: "Princeton Public Schools",
          schools: [
            { key: "Princeton High School", name: "Princeton High School" },
            { key: "John Witherspoon Middle School", name: "John Witherspoon Middle School" },
            { key: "Community Park Elementary School", name: "Community Park Elementary School" },
            { key: "Johnson Park Elementary School", name: "Johnson Park Elementary School" },
            { key: "Littlebrook Elementary School", name: "Littlebrook Elementary School" },
            { key: "Riverside Elementary School", name: "Riverside Elementary School" }
          ]
        },
        {
          key: "Toms River Regional Schools",
          name: "Toms River Regional Schools",
          schools: [
            { key: "Toms River High School North", name: "Toms River High School North" },
            { key: "Toms River High School South", name: "Toms River High School South" },
            { key: "Toms River High School East", name: "Toms River High School East" },
            { key: "Intermediate East", name: "Intermediate East" },
            { key: "Intermediate North", name: "Intermediate North" },
            { key: "Intermediate South", name: "Intermediate South" },
            { key: "Beachwood Elementary School", name: "Beachwood Elementary School" },
            { key: "Cedar Grove Elementary School", name: "Cedar Grove Elementary School" },
            { key: "Citta Elementary School", name: "Citta Elementary School" },
            { key: "East Dover Elementary School", name: "East Dover Elementary School" },
            { key: "Hooper Avenue Elementary School", name: "Hooper Avenue Elementary School" },
            { key: "North Dover Elementary School", name: "North Dover Elementary School" },
            { key: "Pine Beach Elementary School", name: "Pine Beach Elementary School" },
            { key: "Silver Bay Elementary School", name: "Silver Bay Elementary School" },
            { key: "South Toms River Elementary School", name: "South Toms River Elementary School" },
            { key: "Walnut Street Elementary School", name: "Walnut Street Elementary School" },
            { key: "Washington Street Elementary School", name: "Washington Street Elementary School" },
            { key: "West Dover Elementary School", name: "West Dover Elementary School" }
          ]
        },
        {
          key: "Trenton Public Schools",
          name: "Trenton Public Schools",
          schools: [
            { key: "Trenton Central High School", name: "Trenton Central High School" },
            { key: "Daylight/Twilight High School", name: "Daylight/Twilight High School" },
            { key: "STEM Academy", name: "STEM Academy" },
            { key: "Trenton Ninth Grade Academy", name: "Trenton Ninth Grade Academy" },
            { key: "Kilmer School", name: "Kilmer School" },
            { key: "Columbus Elementary School", name: "Columbus Elementary School" },
            { key: "Franklin Elementary School", name: "Franklin Elementary School" },
            { key: "Grant Elementary School", name: "Grant Elementary School" },
            { key: "Gregory Elementary School", name: "Gregory Elementary School" },
            { key: "Harrison Elementary School", name: "Harrison Elementary School" },
            { key: "Hedgepeth-Williams Middle School", name: "Hedgepeth-Williams Middle School" },
            { key: "Jefferson Elementary School", name: "Jefferson Elementary School" },
            { key: "Joyce Kilmer Middle School", name: "Joyce Kilmer Middle School" },
            { key: "Luis Munoz-Rivera Elementary School", name: "Luis Munoz-Rivera Elementary School" },
            { key: "Martin Luther King Jr. Elementary School", name: "Martin Luther King Jr. Elementary School" },
            { key: "Mott Elementary School", name: "Mott Elementary School" },
            { key: "Parker Elementary School", name: "Parker Elementary School" },
            { key: "PJ Hill Elementary School", name: "PJ Hill Elementary School" },
            { key: "Robbins Elementary School", name: "Robbins Elementary School" },
            { key: "Washington Elementary School", name: "Washington Elementary School" },
            { key: "Wilson Elementary School", name: "Wilson Elementary School" }
          ]
        },
        {
          key: "Vineland Public Schools",
          name: "Vineland Public Schools",
          schools: [
            { key: "Vineland High School", name: "Vineland High School" },
            { key: "Veterans Memorial Intermediate School", name: "Veterans Memorial Intermediate School" },
            { key: "Wallace Intermediate School", name: "Wallace Intermediate School" },
            { key: "Rossi Intermediate School", name: "Rossi Intermediate School" },
            { key: "Sgt. Dominick Pilla Middle School", name: "Sgt. Dominick Pilla Middle School" },
            { key: "Anthony Rossi Elementary School", name: "Anthony Rossi Elementary School" },
            { key: "Dr. William Mennies Elementary School", name: "Dr. William Mennies Elementary School" },
            { key: "Gloria M. Sabater Elementary School", name: "Gloria M. Sabater Elementary School" },
            { key: "John H. Winslow Elementary School", name: "John H. Winslow Elementary School" },
            { key: "Max Leuchter Elementary School", name: "Max Leuchter Elementary School" },
            { key: "Petway Elementary School", name: "Petway Elementary School" },
            { key: "D'Ippolito Elementary School", name: "D'Ippolito Elementary School" }
          ]
        },
        {
          key: "Woodbridge Township School District",
          name: "Woodbridge Township School District",
          schools: [
            { key: "Woodbridge High School", name: "Woodbridge High School" },
            { key: "Colonia High School", name: "Colonia High School" },
            { key: "John F. Kennedy Memorial High School", name: "John F. Kennedy Memorial High School" },
            { key: "Avenel Middle School", name: "Avenel Middle School" },
            { key: "Colonia Middle School", name: "Colonia Middle School" },
            { key: "Fords Middle School", name: "Fords Middle School" },
            { key: "Iselin Middle School", name: "Iselin Middle School" },
            { key: "Woodbridge Middle School", name: "Woodbridge Middle School" },
            { key: "Mawbey Street School", name: "Mawbey Street School" },
            { key: "Robert Mascenik School", name: "Robert Mascenik School" },
            { key: "Ross Street School", name: "Ross Street School" },
            { key: "Avenel Street School", name: "Avenel Street School" },
            { key: "Claremont Avenue School", name: "Claremont Avenue School" },
            { key: "Ford Avenue School", name: "Ford Avenue School" },
            { key: "Indiana Avenue School", name: "Indiana Avenue School" },
            { key: "Kennedy Park School", name: "Kennedy Park School" },
            { key: "Lafayette Estates School", name: "Lafayette Estates School" },
            { key: "Lynn Crest School", name: "Lynn Crest School" },
            { key: "Matthew Jago School", name: "Matthew Jago School" },
            { key: "Menlo Park Terrace School", name: "Menlo Park Terrace School" },
            { key: "Oak Ridge Heights School", name: "Oak Ridge Heights School" },
            { key: "Pennsylvania Avenue School", name: "Pennsylvania Avenue School" },
            { key: "Port Reading School", name: "Port Reading School" },
            { key: "Woodbine Avenue School", name: "Woodbine Avenue School" }
          ]
        },
        { key: "Morris School District",
          name: "Morris School District",
          schools: [
            { key: "Morristown High School", name: "Morristown High School" },
            { key: "Frelinghuysen Middle School", name: "Frelinghuysen Middle School" },
            { key: "Alexander Hamilton Elementary School", name: "Alexander Hamilton Elementary School" },
            { key: "Alfred Vail Elementary School", name: "Alfred Vail Elementary School" },
            { key: "Hillcrest Elementary School", name: "Hillcrest Elementary School" },
            { key: "Normandy Park Elementary School", name: "Normandy Park Elementary School" },
            { key: "Sussex Avenue Elementary School", name: "Sussex Avenue Elementary School" },
            { key: "Thomas Jefferson Elementary School", name: "Thomas Jefferson Elementary School" },
            { key: "Woodland Elementary School", name: "Woodland Elementary School" }
          ]
        },
        {
          key: "Parsippany-Troy Hills School District",
          name: "Parsippany-Troy Hills School District",
          schools: [
            { key: "Parsippany High School", name: "Parsippany High School" },
            { key: "Parsippany Hills High School", name: "Parsippany Hills High School" },
            { key: "Brooklawn Middle School", name: "Brooklawn Middle School" },
            { key: "Central Middle School", name: "Central Middle School" },
            { key: "Eastlake Elementary School", name: "Eastlake Elementary School" },
            { key: "Intervale Elementary School", name: "Intervale Elementary School" },
            { key: "Knollwood Elementary School", name: "Knollwood Elementary School" },
            { key: "Lake Hiawatha Elementary School", name: "Lake Hiawatha Elementary School" },
            { key: "Lake Parsippany Elementary School", name: "Lake Parsippany Elementary School" },
            { key: "Littleton Elementary School", name: "Littleton Elementary School" },
            { key: "Mt. Tabor Elementary School", name: "Mt. Tabor Elementary School" },
            { key: "Northvail Elementary School", name: "Northvail Elementary School" },
            { key: "Rockaway Meadow Elementary School", name: "Rockaway Meadow Elementary School" },
            { key: "Troy Hills Elementary School", name: "Troy Hills Elementary School" }
          ]
        },
        {
          key: "Bridgewater-Raritan Regional School District",
          name: "Bridgewater-Raritan Regional School District",
          schools: [
            { key: "Bridgewater-Raritan High School", name: "Bridgewater-Raritan High School" },
            { key: "Bridgewater-Raritan Middle School", name: "Bridgewater-Raritan Middle School" },
            { key: "Bridgewater-Raritan Intermediate School", name: "Bridgewater-Raritan Intermediate School" },
            { key: "Adamsville Primary School", name: "Adamsville Primary School" },
            { key: "Bradley Gardens Primary School", name: "Bradley Gardens Primary School" },
            { key: "Crim Primary School", name: "Crim Primary School" },
            { key: "Hamilton Primary School", name: "Hamilton Primary School" },
            { key: "John F. Kennedy Primary School", name: "John F. Kennedy Primary School" },
            { key: "Milltown Primary School", name: "Milltown Primary School" },
            { key: "Van Holten Primary School", name: "Van Holten Primary School" }
          ]
        },
        {
          key: "Union City School District",
          name: "Union City School District",
          schools: [
            { key: "Union City High School", name: "Union City High School" },
            { key: "Emerson Middle School", name: "Emerson Middle School" },
            { key: "José Martí Middle School", name: "José Martí Middle School" },
            { key: "Colin Powell Elementary School", name: "Colin Powell Elementary School" },
            { key: "Eugenio María de Hostos Elementary School", name: "Eugenio María de Hostos Elementary School" },
            { key: "Hudson School", name: "Hudson School" },
            { key: "Lincoln Elementary School", name: "Lincoln Elementary School" },
            { key: "Union Hill Middle School", name: "Union Hill Middle School" },
            { key: "Washington Elementary School", name: "Washington Elementary School" }
          ]
        },
        {
          key: "Clifton Public Schools",
          name: "Clifton Public Schools",
          schools: [
            { key: "Clifton High School", name: "Clifton High School" },
            { key: "Clifton Middle School", name: "Clifton Middle School" },
            { key: "Christopher Columbus Middle School", name: "Christopher Columbus Middle School" },
            { key: "John Page Middle School", name: "John Page Middle School" },
            { key: "School 11", name: "School 11" },
            { key: "School 12", name: "School 12" },
            { key: "School 13", name: "School 13" },
            { key: "School 14", name: "School 14" },
            { key: "School 15", name: "School 15" },
            { key: "School 16", name: "School 16" },
            { key: "School 17", name: "School 17" }
          ]
        },
        { key: "Passaic City School District",
          name: "Passaic City School District",
          schools: [
            { key: "Passaic High School", name: "Passaic High School" },
            { key: "Passaic Preparatory Academy", name: "Passaic Preparatory Academy" },
            { key: "School No. 1", name: "School No. 1" },
            { key: "School No. 2", name: "School No. 2" },
            { key: "School No. 3", name: "School No. 3" },
            { key: "School No. 4", name: "School No. 4" },
            { key: "School No. 5", name: "School No. 5" },
            { key: "School No. 6", name: "School No. 6" },
            { key: "School No. 7", name: "School No. 7" },
            { key: "School No. 8", name: "School No. 8" },
            { key: "School No. 9", name: "School No. 9" },
            { key: "School No. 10", name: "School No. 10" },
            { key: "School No. 11", name: "School No. 11" },
            { key: "School No. 12", name: "School No. 12" },
            { key: "School No. 13", name: "School No. 13" },
            { key: "School No. 14", name: "School No. 14" },
            { key: "School No. 15", name: "School No. 15" },
            { key: "School No. 16", name: "School No. 16" },
            { key: "School No. 17", name: "School No. 17" },
            { key: "School No. 18", name: "School No. 18" },
            { key: "School No. 20", name: "School No. 20" }
          ]
        },
        {
          key: "Irvington Township Public Schools",
          name: "Irvington Township Public Schools",
          schools: [
            { key: "Irvington High School", name: "Irvington High School" },
            { key: "University Middle School", name: "University Middle School" },
            { key: "Union Avenue Middle School", name: "Union Avenue Middle School" },
            { key: "Florence Avenue School", name: "Florence Avenue School" },
            { key: "Grove Street School", name: "Grove Street School" },
            { key: "Madison Avenue School", name: "Madison Avenue School" },
            { key: "Mount Vernon Avenue School", name: "Mount Vernon Avenue School" },
            { key: "Thurgood Marshall Elementary School", name: "Thurgood Marshall Elementary School" },
            { key: "Berkeley Terrace Elementary School", name: "Berkeley Terrace Elementary School" }
          ]
        },
        {
          key: "West Orange Public School District",
          name: "West Orange Public School District",
          schools: [
            { key: "West Orange High School", name: "West Orange High School" },
            { key: "Edison Middle School", name: "Edison Middle School" },
            { key: "Liberty Middle School", name: "Liberty Middle School" },
            { key: "Hazel Avenue Elementary School", name: "Hazel Avenue Elementary School" },
            { key: "Kelly Elementary School", name: "Kelly Elementary School" },
            { key: "Pleasantdale Elementary School", name: "Pleasantdale Elementary School" },
            { key: "Redwood Elementary School", name: "Redwood Elementary School" },
            { key: "Roosevelt Middle School", name: "Roosevelt Middle School" },
            { key: "Washington Elementary School", name: "Washington Elementary School" }
          ]
        },
        {
          key: "East Orange School District",
          name: "East Orange School District",
          schools: [
            { key: "East Orange Campus High School", name: "East Orange Campus High School" },
            { key: "Cicely Tyson School of Performing and Fine Arts", name: "Cicely Tyson School of Performing and Fine Arts" },
            { key: "STEM Academy of the Oranges", name: "STEM Academy of the Oranges" },
            { key: "Glenwood Elementary School", name: "Glenwood Elementary School" },
            { key: "Gordon Parks Elementary School", name: "Gordon Parks Elementary School" },
            { key: "Johnnie L. Cochran Jr. Academy", name: "Johnnie L. Cochran Jr. Academy" },
            { key: "Langston Hughes Elementary School", name: "Langston Hughes Elementary School" },
            { key: "Mildred Barry Garvin School", name: "Mildred Barry Garvin School" },
            { key: "Park Elementary School", name: "Park Elementary School" },
            { key: "Sonya Sotomayor Elementary School", name: "Sonya Sotomayor Elementary School" },
            { key: "Vernon L. Davey Middle School", name: "Vernon L. Davey Middle School" }
          ]
        },
        {
          key: "Hoboken Public School District",
          name: "Hoboken Public School District",
          schools: [
            { key: "Hoboken High School", name: "Hoboken High School" },
            { key: "A.J. Demarest Elementary School", name: "A.J. Demarest Elementary School" },
            { key: "Calabro Elementary School", name: "Calabro Elementary School" },
            { key: "Connors Elementary School", name: "Connors Elementary School" },
            { key: "Wallace Elementary School", name: "Wallace Elementary School" }
          ]
        },
        {
          key: "Bayonne Public Schools",
          name: "Bayonne Public Schools",
          schools: [
            { key: "Bayonne High School", name: "Bayonne High School" },
            { key: "Bayonne Middle School", name: "Bayonne Middle School" },
            { key: "Lincoln Community School", name: "Lincoln Community School" },
            { key: "Horace Mann Elementary School", name: "Horace Mann Elementary School" },
            { key: "Henry Harris Elementary School", name: "Henry Harris Elementary School" },
            { key: "Midtown Community Elementary School", name: "Midtown Community Elementary School" },
            { key: "Nicholas Oresko Elementary School", name: "Nicholas Oresko Elementary School" },
            { key: "Robinson Elementary School", name: "Robinson Elementary School" },
            { key: "Washington Community School", name: "Washington Community School" }
          ]
        }
      ]
    }
  },
];
