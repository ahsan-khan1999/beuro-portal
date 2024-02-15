import { DocumentViewer } from "react-documents";

export default function App() {
    return (
        <div>
            <h1>My App</h1>
            <DocumentViewer
                // url="https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/signatures/A-2043-Umzugsfuchs.1707985220882.pdf"
                url="https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/testing/umzugsfuchs.png"
                viewer="url"
                style={{height:"100vh",width:"100%"}}
            >
            </DocumentViewer>


            <DocumentViewer
                url="https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/signatures/A-2043-Umzugsfuchs.1707985220882.pdf"
                // url="https://kaufes-dev-v2.s3.me-south-1.amazonaws.com/testing/umzugsfuchs.png"
                viewer="url"
                style={{height:"100vh",width:"100%"}}
            >
            </DocumentViewer>
        </div>
    )
};