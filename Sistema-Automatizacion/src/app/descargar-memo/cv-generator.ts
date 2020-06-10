import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun } from "docx";
const PHONE_NUMBER = "07534563401";
const PROFILE_URL = "https://www.linkedin.com/in/dolan1";
const EMAIL = "docx@docx.com";

export class DocumentCreator {
    // tslint:disable-next-line: typedef
    public create([postulantes, destinatario, remitente, periodo]): Document {
        const document = new Document();
        let fecha:Date = new Date();
        let mes = fecha.getMonth()
        let mesNombre = ""
        switch (mes) {
            case 0:
                mesNombre = "Enero"
                break;
            case 1:
                mesNombre = "Febrero"
                break;
            case 2:
                mesNombre = "Marzo"
                break;
            case 3:
                mesNombre = "Abril"
                break;
            case 4:
                mesNombre = "Mayo"
                break;
            case 5:
                mesNombre = "Junio"
                break;
            case 6:
                mesNombre = "Julio"
                break;
            case 7:
                mesNombre = "Agosto"
                break;
            case 8:
                mesNombre = "Septiembre"
                break;
            case 9:
                mesNombre = "Octubre"
                break;
            case 10:
                mesNombre = "Noviembre"
                break;
            case 11:
                mesNombre = "Diciembre"
                break;
        }
        let fechaFinal = `${fecha.getDate()} ` + mesNombre + ` ${fecha.getFullYear()}`;

        document.addSection({
            children: [
                new Paragraph({
                    text: "Memorando",
                    heading: HeadingLevel.TITLE,
                }),
                this.createToInfo(destinatario),
                this.createFromInfo(remitente),
                // this.createHeading("Education"),
                // ...postulantes
                //     .map((position) => {
                //         const arr: Paragraph[] = [];

                //         const bulletPoints = this.splitParagraphIntoBullets(position.nombre);
                //         bulletPoints.forEach((bulletPoint) => {
                //             arr.push(this.createBullet(bulletPoint));
                //         });

                //         return arr;
                //     })
                //     .reduce((prev, curr) => prev.concat(curr), []),
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    children: [
                        new TextRun(`Fecha: ${fechaFinal}`).break(),
                    ],
                }),
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    children: [
                        new TextRun('Asunto: Admisión de estudiantes Maestría en Gerencia de Proyectos.').break(),
                    ],
                }),
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    children: [
                        new TextRun(`Adjunto encontrará los documentos de los estudiantes que han sido admitidos para el ${periodo.periodo} al Programa de Maestría en Gerencia de Proyectos, en la Sede de ${periodo.sede}. Favor incluirlos dentro del plan ${fecha.getFullYear()}.`).break(),
                    ],
                }),
                new Paragraph({
                    alignment: AlignmentType.JUSTIFIED,
                    children: [
                        new TextRun(`Cualquier consulta estoy a la orden.`).break(),
                    ],
                }),
            ],
        });

        return document;
    }

    public createFromInfo(remitente): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
                new TextRun(`De: ${remitente.nombre}`).break(),
            ],
        });
    }

    public createToInfo(destinatario): Paragraph {
        return new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            children: [
                new TextRun(`Para: ${destinatario.nombre}`).break(),
            ],
        });
    }

    public createHeading(text: string): Paragraph {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_1,
            thematicBreak: true,
        });
    }

    public createSubHeading(text: string): Paragraph {
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_2,
        });
    }

    public createInstitutionHeader(institutionName: string): Paragraph {
        return new Paragraph({
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            children: [
                new TextRun({
                    text: institutionName,
                    bold: true,
                }),
            ],
        });
    }

    public createRoleText(roleText: string): Paragraph {
        return new Paragraph({
            children: [
                new TextRun({
                    text: roleText,
                    italics: true,
                }),
            ],
        });
    }

    public createBullet(text: string): Paragraph {
        return new Paragraph({
            text: text,
            bullet: {
                level: 0,
            },
        });
    }

    // tslint:disable-next-line:no-any
    public createSkillList(skills: any[]): Paragraph {
        return new Paragraph({
            children: [new TextRun(skills.map((skill) => skill.nombre).join(", ") + ".")],
        });
    }

    // tslint:disable-next-line:no-any
    public createAchivementsList(achivements: any[]): Paragraph[] {
        return achivements.map(
            (achievement) =>
                new Paragraph({
                    text: achievement.nombre,
                    bullet: {
                        level: 0,
                    },
                }),
        );
    }

    public createInterests(interests: string): Paragraph {
        return new Paragraph({
            children: [new TextRun(interests)],
        });
    }

    public splitParagraphIntoBullets(text: string): string[] {
        return text.split("\n\n");
    }

    // tslint:disable-next-line:no-any
    public createPositionDateText(startDate: any, endDate: any, isCurrent: boolean): string {
        const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
        const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

        return `${startDateText} - ${endDateText}`;
    }

    public getMonthFromInt(value: number): string {
        switch (value) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sept";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return "N/A";
        }
    }
}