import React from 'react';
import { graphql, Link } from 'gatsby';
import SanityImage from "gatsby-plugin-sanity-image";

// Dette er kun pseudokode for å vise hva som er hva, det må lages komponenter til de forskjellige tingene og legges inn i templaten her

function Student({ data }) {
  const student = data.sanityStudent;
  const allStudents = data.allSanityStudent.edges;
  console.log(student);
  console.log(allStudents);
  let studentList = [];
  allStudents.forEach(element => {
    if (student.slug.current !== element.node.slug.current) {
      studentList.push(element);
    }
  })
  console.log(studentList);

  return (
    <section>
      <Link to={`/${student.studyprogramme.slug.current}`} >&#8592; Tilbake</Link>
      <h1>{student.name} {student.firstlettersurname}</h1>
      <p>{student.studyprogramme.title}</p>
      <SanityImage asset={student.image._rawAsset} alt="Image of the student" />
      <p>{student.bio[0].children[0].text}</p>

      {student.social.behance ? <a href={student.social.behance} target='_blank' rel="noreferrer">Behance</a> : null}
      {student.social.instagram ? <a href={student.social.instagram} target='_blank' rel="noreferrer">Instagram</a> : null}
      {student.social.linkedin ? <a href={student.social.linkedin} target='_blank' rel="noreferrer">LinkedIn</a> : null}
      {student.social.portfolio ? <a href={student.social.portfolio} target='_blank' rel="noreferrer">Portfolio</a> : null}

      <SanityImage asset={student.showcase.firstproject.mainImage._rawAsset} alt={student.showcase.firstproject.title} />
      <p>{student.showcase.firstproject.description[0].children[0].text}</p>

      {/* <SanityImage asset={student.showcase.secondproject.mainImage._rawAsset} alt={student.showcase.firstproject.title} /> Disse er null atm */}
      {/* <p>{student.showcase.secondproject.description[0].children[0].text}</p>                                              Disse er null atm */}

      {/* <SanityImage asset={student.showcase.thirdproject.mainImage._rawAsset} alt={student.showcase.firstproject.title} /> Disse er null atm */}
      {/* <p>{student.showcase.thirdproject.description[0].children[0].text}</p>                                              Disse er null atm */}

      {studentList.length === 0 ? null :
        <>
          <h2>Studenter - {student.studyprogramme.title}</h2>
          {studentList.map(({ node }) => (
            <Link to={`${node.slug.current}`} key={node.id}>
              <div>
                <SanityImage asset={node.image._rawAsset} alt="" />
                <p>{node.name} {node.firstlettersurname}</p>
              </div>
            </Link>
          ))}
        </>
      }
    </section>
  );
}

export const query = graphql`
query MyQuery($slug: [String] = "", $studyprogramme: [String] = "") {
  sanityStudent(slug: {current: {in: $slug}}) {
    name
    firstlettersurname
    studyprogramme {
      title
      slug {
        current
      }
    }
    bio {
      children {
        text
      }
    }
    image {
      _rawAsset
    }
    social {
      behance
      instagram
      linkedin
      portfolio
    }
    slug {
      current
    }
    showcase {
      firstproject {
        description {
          children {
            text
          }
        }
        title
        mainImage {
          _rawAsset
        }
      }
      secondproject {
        description {
          children {
            text
          }
        }
        mainImage {
          _rawAsset
        }
        title
      }
      thirdproject {
        description {
          children {
            text
          }
        }
        mainImage {
          _rawAsset
        }
        title
      }
    }
  }
  allSanityStudent(filter: {studyprogramme: {slug: {current: {in: $studyprogramme}}}}) {
    edges {
      node {
        id
        name
        surname
        image {
          _rawAsset
        }
        slug {
          current
        }
      }
    }
  }
}
`
export default Student;
