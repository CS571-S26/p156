import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SafeSearchProvider} from "./context/SafeSearch/SafeSearchProvider.tsx";
import {HashRouter, Routes, Route} from "react-router-dom";
import {ToolBeltContextProvider} from "./context/ToolBelt/ToolBeltProvider.tsx";
import ToolBeltPane from "./components/ToolBelt/ToolBeltPane.tsx";
import WordPage from "./pages/WordPage.tsx";
import Navbar from "./components/Navbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import {AuthContextProvider} from "./context/Auth/AuthContextProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";
import UserContextProvider from "./context/User/UserContextProvider.tsx";
import {TOOL_BELT_STRIP_WIDTH_VW} from "./components/ToolBelt/ToolBeltConstants.ts";

const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeSearchProvider>
            <QueryClientProvider client={queryClient}>
                <ToolBeltContextProvider>
                    <HashRouter>
                        <ToolBeltPane/>
                        <AuthContextProvider>
                            <UserContextProvider>
                                <div style={{marginRight: `${TOOL_BELT_STRIP_WIDTH_VW}vw`}}>
                                    <Navbar/>
                                    <Routes>
                                        <Route path="/" element={<HomePage/>}/>
                                        <Route path="/login" element={<LoginPage/>}/>
                                        <Route path="/register" element={<RegisterPage/>}/>
                                        <Route path="/dictionary/:word" element={<WordPage/>}/>
                                        <Route path="/error" element={<ErrorPage/>}/>
                                        <Route element={<ProtectedRoute/>}>
                                            <Route path="/inventory" element={<InventoryPage/>}></Route>

                                        </Route>
                                    </Routes>
                                </div>
                            </UserContextProvider>
                        </AuthContextProvider>
                    </HashRouter>
                </ToolBeltContextProvider>
            </QueryClientProvider>
        </SafeSearchProvider>
    );
}
