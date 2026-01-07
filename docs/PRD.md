Product Requirements Document: EcoVibe
Project Name	EcoVibe
Version	1.1 (Expanded Marketplace Scope)
Status	Deployed (Vercel)
Platform	Web3 dApp (Mobile-First Web)
Blockchain	Scroll Sepolia (L2)
Theme	Regenerative Finance (ReFi) / Decentralized Gig Economy

1. Executive Summary
EcoVibe is a decentralized, AI-verified waste management and sanitation marketplace built on Scroll. While initially designed for public environmental cleanups, it serves as a broader Peer-to-Peer (P2P) Cleaning Protocol.
It allows anyone—from NGOs cleaning a beach to individuals needing a garage cleared out—to create a funded "Mission." Local workers ("Cleaners") pick up these tasks, execute them, and earn instant crypto rewards upon AI verification of the work.
The Core Problem
Waste Crisis: Urban centers suffer from pollution due to lack of municipal resources.
Individual Sanitation Burden: Homeowners and event hosts often have massive cleaning tasks (e.g., clearing a flooded compound, emptying a cluttered garage) but struggle to find reliable, immediate labor.
Trust Gap: Hiring informal labor is risky; paying upfront doesn't guarantee work quality.
Financial Exclusion: Potential workers lack access to formal gig platforms.
The Solution
On-Demand Missions: Individuals can post specific "Bounties" for sanitation tasks (e.g., "Clean my Garage - 0.02 ETH").
Trustless Verification: AI analyzes "Before/After" footage to prove the massive task was completed before funds are released.
Instant Payouts: Smart contracts release funds immediately upon verification.

2. User Personas
A. The Cleaner (Worker)
Profile: Youth/Gig-worker in Lagos. Smartphone owner.
Goal: Earn income quickly for physical work.
Needs: Access to gigs without a middleman agency, instant payment, simple mobile UI.
B. The Sponsor (Creator)
Sub-Persona 1: The Organization (Public)
Profile: NGO, Local Business, Community Leader.
Goal: Clean up public spaces (Marketplaces, Beaches, Gutters) for social impact.
Sub-Persona 2: The Individual (Private)
Profile: Homeowner, Landlord, or Event Host.
Goal: Solve a specific sanitation problem (e.g., "Clear out debris from my renovation," "Clean my garage," "Sanitize venue after a wedding").
Needs: Speed, reliability, and "Proof of Work" before paying.

3. Functional Requirements
3.1. Authentication & Onboarding (Gasless)
Provider: Privy.
Methods: Email Login or External Wallet.
Requirement: Both Cleaners and Individual Sponsors must be able to log in easily to post or accept tasks.
3.2. The Dashboard (Command Center)
Overview Tab:
Stats: Active Missions, Total Payouts.
Campaigns Tab (The Marketplace):
Browse Mode (For Cleaners): List available jobs.
Filters: Public (Community) vs. Private (Individual Gigs).
Card Data: Task Title (e.g., "Garage Cleanout"), Location, Reward.
Create Mode (For Sponsors/Individuals): Form to launch a mission.
Input: Task Title (e.g., "Clear Debris at Plot 4").
Input: Description (e.g., "Remove all construction waste and sweep floor").
Input: Proof Requirement (e.g., "Video of empty floor").
Input: Reward Pool (Amount needed to pay the worker).
3.3. The Work Flow (The "Vibe")
Job Posting: An individual (e.g., Mr. Tunde) posts a "Garage Cleanout" mission and funds the pool with 0.01 ETH.
Selection: A Cleaner sees the gig on the dashboard and clicks "Participate."
Execution & Proof:
Cleaner performs the task.
Cleaner opens the Camera Modal and records the empty, clean garage.
Verification (AI):
The system analyzes the video to ensure the "Before" state (messy) matches the "After" state (clean).
Settlement:
Upon success, the 0.01 ETH is released from the smart contract to the Cleaner.
3.4. Data Management (Supabase)
Table Structure (campaigns):
id: Unique ID.
title: String.
description: String (Crucial for individual tasks to specify details).
reward: String.
type: "Public" | "Private" (New field to distinguish community vs individual tasks).
location: String.
creator_address: Wallet address of the individual or NGO.

4. Technical Architecture (The Stack)
Component	Technology	Role
Frontend	Next.js 14	Mobile-First interface for posting and accepting gigs.
Styling	Tailwind CSS	Clean UI.
Auth	Privy	Easy login for non-crypto homeowners.
Database	Supabase	Stores mission details.
Blockchain	Scroll Sepolia	Escrow and Payouts.
AI	OpenAI GPT-4o	Visual Verification Agent.

5. Design System (UI/UX)
Visual Style: Professional & Trustworthy.
Color Palette: Deep Navy / White / Neon Green.
Key UX Feature: The "Create Campaign" flow must be simple enough for a regular person to use. It should feel like posting a tweet, not writing code.

6. Future Roadmap
Phase 1 (Current): MVP Marketplace. Open posting of tasks.
Phase 2 (Escrow): Smart Contract holds the Individual's funds so the Cleaner knows the money is guaranteed before starting work.
Phase 3 (Reputation): "Super Cleaner" badges for workers with high ratings, allowing them to claim higher-paying individual gigs (like inside homes).
Phase 4 (Geo-Fencing): Only allow users physically near the "Garage" or "Event Center" to see and accept the task.