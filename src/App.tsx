import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SafeSearchProvider} from "./context/SafeSearch/SafeSearchProvider.tsx";
import {WordEngine} from "./components/WordEngine/WordEngine.tsx";
import {HashRouter, Routes, Route} from "react-router-dom";
import {ToolBeltContextProvider} from "./context/ToolBelt/ToolBeltProvider.tsx";
import ToolBeltPane from "./components/ToolBelt/ToolBeltPane.tsx";
import WordPage from "./components/WordPage.tsx";
import Navbar from "./components/Navbar.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <SafeSearchProvider>
            <QueryClientProvider client={queryClient}>
                <ToolBeltContextProvider>
                    <HashRouter>
                        <ToolBeltPane/>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<WordEngine/>}/>
                            <Route path="/dictionary/:word" element={<WordPage/>}/>
                        </Routes>
                    </HashRouter>
                </ToolBeltContextProvider>
            </QueryClientProvider>
        </SafeSearchProvider>
    );
}

export default App;
