import React from "react";
import Kanbas from "./Kanbas";
// import "./App.css";
import Labs from "./Labs";
import {HashRouter, Link, Route, Routes, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./Kanbas/store";

function App() {
    return (
        <HashRouter>
            <div>
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Kanbas"/>}/>
                        <Route path="/Labs/*" element={<Labs/>}/>
                        <Route path="/Kanbas/*" element={<Kanbas/>}/>
                    </Routes>
                </Provider>
            </div>
        </HashRouter>
    );
}

export default App;
