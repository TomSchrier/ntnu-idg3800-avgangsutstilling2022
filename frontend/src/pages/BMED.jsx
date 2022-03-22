import React from "react";
import { graphql } from "gatsby";

const BWU = ({ data }) => {
    const students = data.allSanityStudent.edges;
    console.log(students);

    return (
        <main>
            <h1>Studenter - Grafisk Design</h1>
            <p>Paragraf av tekst</p>
        </main>
    );
}

export const query = graphql`
    {
        allSanityStudent(filter: {studyprogramme: {code: {in: "BMED"}}}) {
            edges {
                node {
                    id
                    name
                    surname
                    image {
                        _rawAsset
                    }
                }
            }
        }
    }
    `

export default BWU;