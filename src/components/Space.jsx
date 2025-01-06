import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  MessageSquare,
  Home,
  Bug,
  FileText,
  FileEdit,
  Phone,
} from "lucide-react";
import "@/app/globals.css";

import {
  fetchPriorities,
  fetchAllProjects,
  createIssue,
} from "../utils/apiClient";
const IssuePortalApp = () => {
  // State management
  const [currentPage, setCurrentPage] = useState("portal");
  const [selectedIssueType, setSelectedIssueType] = useState(null);
  const [formData, setFormData] = useState({
    product: "",
    scene: "",
    priority: "",
    title: "",
    description: "",
  });
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  useEffect(() => {
    const getPriorities = async () => {
      try {
        const data = await fetchPriorities();
        setPriorities(data.values || []);
      } catch (error) {
        setError(error.message || "Failed to fetch priorities");
      } finally {
        setLoading(false);
      }
    };

    const getallProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setAllProjects(data);
      } catch (error) {
        // เพิ่ม catch block
        setError(error.message || "Failed to fetch projects"); // แก้ข้อความ error
      } finally {
        setLoading(false);
      }
    };

    getallProjects();
    getPriorities();
  }, []);

  if (loading) return <p>Loading priorities...</p>;
  if (error) return <p>Error: {error}</p>;

  // Toolbar Component
  const Toolbar = () => (
    <div className="flex items-center space-x-2 p-2 border-b">
      <select className="text-sm border rounded px-2 py-1">
        <option>Normal</option>
      </select>
      <div className="flex space-x-1 border-l pl-2">
        <button className="p-1 hover:bg-gray-100 rounded">B</button>
        <button className="p-1 hover:bg-gray-100 rounded">I</button>
        <button className="p-1 hover:bg-gray-100 rounded">U</button>
        <button className="p-1 hover:bg-gray-100 rounded">G</button>
      </div>
      <div className="flex space-x-1 border-l pl-2">
        <button className="p-1 hover:bg-gray-100 rounded">≡</button>
        <button className="p-1 hover:bg-gray-100 rounded">⋮</button>
      </div>
    </div>
  );

  // Navigation handlers
  const handleIssuePortalClick = () => setCurrentPage("issues");
  const handleIssueTypeClick = (type) => {
    setSelectedIssueType(type);
    setCurrentPage("form");
  };
  const handleHomeClick = () => {
    setCurrentPage("portal");
    setSelectedIssueType(null);
    setFormData({
      product: "",
      scene: "",
      priority: "None",
      title: "",
      description: "",
    });
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", {
      issueType: selectedIssueType,
      ...formData,
    });
    createIssue({ issueType: selectedIssueType, ...formData });
  };

  // Render content based on current page
  const getContent = () => {
    switch (currentPage) {
      case "portal":
        return (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="px-6 py-4 border-b">
              <h1 className="text-lg font-normal text-gray-800">
                Issue Portal
              </h1>
            </div>

            <div className="px-6 py-4">
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Contact us about
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div
                  className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  onClick={handleIssuePortalClick}
                >
                  <MessageSquare className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500 hover:underline">
                      แจ้งปัญหาการใช้งาน
                    </span>
                    <span className="text-xs text-gray-400">
                      แจ้งปัญหาการใช้งาน / ติดตามข้อมูล
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-start space-x-2 hover:bg-gray-50 p-2 rounded-md">
                  <Home className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                      หน้าหลัก
                    </span>
                    <span className="text-xs text-gray-400">
                      เข้าสู่ หน้าหลัก / Home
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t">
              <div className="text-xs text-gray-500 text-right">
                Version 1.2.010 (Last Updated 2024-12-26-10:27)
              </div>
            </div>
          </div>
        );

      case "issues":
        return (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h1 className="text-lg font-normal text-gray-800">
                แจ้งปัญหาการใช้งาน
              </h1>
              <div
                className="text-blue-500 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                onClick={handleHomeClick}
              >
                <Home className="w-4 h-4 mr-1" />
                <span className="text-sm">กลับสู่หน้าหลัก</span>
              </div>
            </div>

            <div className="px-6 py-4">
              <h2 className="text-sm font-medium mb-4">
                เลือกประเภทปัญหาการใช้งาน
              </h2>

              <div className="space-y-4">
                <div
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150"
                  onClick={() => handleIssueTypeClick("Bug")}
                >
                  <Bug className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500">Bug</span>
                    <span className="text-xs text-gray-400">
                      แจ้งปัญหา ที่เกิดจากระบบผิดพลาด
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150"
                  onClick={() => handleIssueTypeClick("change-request")}
                >
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500">ChangeRequest</span>
                    <span className="text-xs text-gray-400">
                      แจ้งปรับปรุง หรือ เพิ่มเติมความต้องการของระบบ
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150"
                  onClick={() => handleIssueTypeClick("memo")}
                >
                  <FileEdit className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500">Memo</span>
                    <span className="text-xs text-gray-400">
                      แจ้งปรับปรุงข้อมูลในระบบ
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-sm text-blue-500">Use</span>
                    <span className="text-xs text-gray-400">
                      สอบถามข้อมูลทั่วไป / การใช้งานระบบ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t">
              <div className="text-xs text-gray-500 text-right">
                Version 1.2.010 (Last Updated 2024-12-26-10:27)
              </div>
            </div>
          </div>
        );

      case "form":
        return (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h1 className="text-lg font-normal text-gray-800">
                แจ้งปัญหาการใช้งาน
              </h1>
              <div
                className="text-blue-500 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                onClick={handleHomeClick}
              >
                <Home className="w-4 h-4 mr-1" />
                <span className="text-sm">กลับสู่หน้าหลัก</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">IssueType</div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
                  {selectedIssueType === "Bug" && (
                    <>
                      <Bug className="w-5 h-5 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-500">Bug</span>
                        <span className="text-xs text-gray-400">
                          แจ้งปัญหา ที่เกิดจากระบบผิดพลาด
                        </span>
                      </div>
                    </>
                  )}
                  {selectedIssueType === "change-request" && (
                    <>
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-500">
                          ChangeRequest
                        </span>
                        <span className="text-xs text-gray-400">
                          แจ้งปรับปรุง หรือ เพิ่มเติมความต้องการของระบบ
                        </span>
                      </div>
                    </>
                  )}
                  {selectedIssueType === "memo" && (
                    <>
                      <FileEdit className="w-5 h-5 text-blue-500" />
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-500">Memo</span>
                        <span className="text-xs text-gray-400">
                          แจ้งปรับปรุงข้อมูลในระบบ
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {selectedIssueType === "change-request" && (
                <div className="mb-4 text-sm text-blue-500">
                  Template CR Form ↓
                </div>
              )}
              {selectedIssueType === "memo" && (
                <div className="mb-4 text-sm text-blue-500">
                  Template Memo Form ↓
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Product <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.product}
                  onChange={(e) =>
                    setFormData({ ...formData, product: e.target.value })
                  }
                  required
                >
                  {allProjects.map((projects) => (
                    <option key={projects.id} value={projects.key}>
                      {projects.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Scene
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.scene}
                  onChange={(e) =>
                    setFormData({ ...formData, scene: e.target.value })
                  }
                >
                  <option value="">Scene</option>
                  <option value="scene1">Scene 1</option>
                  <option value="scene2">Scene 2</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Priority
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={priorities.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.name}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  หัวข้อ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  รายละเอียด
                </label>
                <div className="border rounded-md">
                  <Toolbar />
                  <textarea
                    className="w-full p-2 min-h-[200px] border-t-0 rounded-b-md resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2">
                  ไฟล์แนบ
                </label>
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  <button
                    type="button"
                    className="text-blue-500 text-sm hover:text-blue-600"
                  >
                    📎 Click to Upload
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  ยืนยัน
                </button>
              </div>
            </form>

            <div className="px-4 py-2 border-t">
              <div className="text-xs text-gray-500 text-right">
                Version 1.2.010 (Last Updated 2024-12-26-10:27)
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col items-center justify-center p-8">
      {getContent()}
    </div>
  );
};

export default IssuePortalApp;
