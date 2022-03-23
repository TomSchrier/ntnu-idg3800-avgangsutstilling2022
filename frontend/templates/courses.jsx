import React from "react";
import { graphql, Link } from "gatsby";

export default function Courses({ data }) {
    const students = data.allSanityStudent.edges;
    console.log(students);

    return (
        <main>
            <h1>Studenter - </h1>
            <p>Paragraf av tekst</p>
            {/* {students.map(student => (
                <Link to={`${student.node.slug.current}`} key={student.node.slug.current}>
                    <div>
                        <img src={student.node.image._rawAsset._ref} alt={student.node.name} />
                    </div>
                </Link>
            ))} */}
        </main>
    );
}

export const query = graphql`
    {
        allSanityStudent(filter: {studyprogramme: {code: {in: $slug}}}) {
            edges {
                node {
                    id
                    name
                    surname
                    slug {
                        current
                    }
                    image {
                        _rawAsset
                    }
                }
            }
        }
    }
    `