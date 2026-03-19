import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SafeSearchProvider} from "./context/SafeSearchContext.tsx";
import {WordEngine} from "./components/dictionary/WordEngine.tsx";
import {HashRouter, Routes, Route} from "react-router-dom";

const queryClient = new QueryClient();

function App() {
    return (
        <SafeSearchProvider>
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<WordEngine/>}/>
                    </Routes>
                </HashRouter>
            </QueryClientProvider>
        </SafeSearchProvider>
    );
}

export default App;
