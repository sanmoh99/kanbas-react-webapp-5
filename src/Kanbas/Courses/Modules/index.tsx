import {addModule, editModule, updateModule, deleteModule, setModules} from "./reducer";
import {useSelector, useDispatch} from "react-redux";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import {BsGripVertical} from "react-icons/bs";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import ModuleControlButtons from "./ModuleControlButtons";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const {cid} = useParams();
    const {modules} = useSelector((state: any) => state.modulesReducer);


    const fetchModules = async () => {
        try {
            dispatch(setModules( await coursesClient.findModulesForCourse(cid as string) ));
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchModules();
    }, []);

    const dispatch = useDispatch();

    const [moduleName, setModuleName] = useState("");

    const createModuleForCourse = async () => {
        if (!cid) return;
        const newModule = { name: moduleName, course: cid };
        const module = await coursesClient.createModuleForCourse(cid, newModule);
        dispatch(addModule(module));
    };

    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
        module = {...module, editing: false};
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };

    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div>
            <ModulesControls
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={() => {
                    createModuleForCourse();
                    setModuleName("");
                }}
            />
            <br/>
            <br/>
            {/* Implement Collapse All button, View Progress button, etc. */}
            <ul className="mt-2 list-group rounded-0 w-100">
                {modules
                    // .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <li
                            key={module._id}
                            className="wd-module list-group-item p-0
                   mb-5 fs-5 border-gray"
                        >
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3"/>
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input
                                        className="form-control w-50 d-inline-block"
                                        onChange={(e) =>
                                            dispatch(updateModule({...module, name:e.target.value}))
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveModule(module);
                                            }
                                        }}
                                        value={module.name}
                                    />
                                )}
                                {isFaculty &&
                                    <ModuleControlButtons
                                        moduleId={module._id}
                                        deleteModule={(moduleId) => removeModule(moduleId)}
                                        editModule={(moduleId) => dispatch(editModule(moduleId))}
                                    />
                                }
                            </div>
                            <ul className="wd-lessons list-group rounded-0">
                                {module.lessons &&
                                    module.lessons.map((lesson: any) => (
                                        <li className="wd-lesson list-group-item p-3 ps-1">
                                            <BsGripVertical className="me-2 fs-3"/>
                                            {lesson.name} <LessonControlButtons/>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
