import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <div className="App">
            <h1>Главная</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/about" element={<div>About</div>}/>
                    <Route path="/registration" element={<div>Registration</div>}/>
                    <Route path="login" element={<div>Login</div>}/>
                    <Route path="/game" element={<div>Game</div>}/>
                    <Route exact path="/error" element={<div>Error</div>}/>
                    <Route exact path="/" element={<div>Home</div>}/>
                    <Route path="*" element={<div>NotFound</div>}/>
                </Routes>
            </Suspense>
        </div>
    );
};
