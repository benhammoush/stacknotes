/**
 * Cleans mounted React trees between isolated component tests.
 * @packageDocumentation
 */
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);
