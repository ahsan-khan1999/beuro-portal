    import dynamic from "next/dynamic";

    import PDF from "./pdf-layout";
    import { BlobProvider } from "@react-pdf/renderer";

    const DownloadPdf = () => {
    return (
        <BlobProvider document={<PDF />}>
        {({ url, loading, error }) => {
            if (loading) {
            return <div>Loading...</div>;
            }

            if (error) {
            console.error(error);
            return <div>Error generating PDF</div>;
            }

            return (
            <a href={url || "#"} target="_blank" rel="noopener noreferrer">
                Download PDF
            </a>
            );
        }}
        </BlobProvider>
    );
    };

    export default DownloadPdf;