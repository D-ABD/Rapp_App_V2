// src/tests/Navbar.test.tsx
import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  test("affiche le logo et le nom de l'application", () => {
    expect(screen.getByAltText("Logo Rapp App")).toBeInTheDocument();
    expect(screen.getByText("Rapp App")).toBeInTheDocument();
  });

  test("affiche tous les liens de navigation", () => {
    const links = [
      "Accueil",
      "Formations",
      "Dashboard",
      "MGO",
      "Login",
      "Centres",
      "📆 Revue Hebdo",
      "Paramètres",
      "A propos",
      "Test Supabase",
    ];

    links.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });
});
