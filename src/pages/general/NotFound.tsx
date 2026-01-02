import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-code">404</h1>

      <h2 className="notfound-title">Page Not Found</h2>

      <p className="notfound-text">
        The page you're looking for doesn’t exist or has been moved.
      </p>
    </div>
  );
}
