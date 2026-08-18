import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EnterpriseLayout } from './components/layout/EnterpriseLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { VehiclesPage } from './pages/VehiclesPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { BranchesPage } from './pages/BranchesPage';
import { UsersPage } from './pages/UsersPage';
import { RolesPage } from './pages/RolesPage';
import { ActivityLogsPage } from './pages/ActivityLogsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';

// Phase 2 Forensics Imports
import { OBDAcquisitionPage } from './pages/forensics/OBDAcquisitionPage';
import { SensorIntelligencePage } from './pages/forensics/SensorIntelligencePage';
import { CANBusForensicsPage } from './pages/forensics/CANBusForensicsPage';
import { ECUForensicsPage } from './pages/forensics/ECUForensicsPage';
import { EDRAnalysisPage } from './pages/forensics/EDRAnalysisPage';
import { GPSTelematicsPage } from './pages/forensics/GPSTelematicsPage';
import { DigitalEvidenceLockerPage } from './pages/forensics/DigitalEvidenceLockerPage';
import { DocumentOCRPage } from './pages/forensics/DocumentOCRPage';
import { AIDamageAnalysisPage } from './pages/forensics/AIDamageAnalysisPage';
import { AIInvestigationEnginePage } from './pages/forensics/AIInvestigationEnginePage';
import { ForensicTimelinePage } from './pages/forensics/ForensicTimelinePage';
import { InvestigatorWorkspacePage } from './pages/forensics/InvestigatorWorkspacePage';

// Phase 3A Intelligence Imports
import { FraudNetworkExplorerPage } from './pages/intelligence/FraudNetworkExplorerPage';
import { GraphAlgorithmsPage } from './pages/intelligence/GraphAlgorithmsPage';
import { VINPolicyDuplicationPage } from './pages/intelligence/VINPolicyDuplicationPage';
import { WorkshopSurveyorRiskPage } from './pages/intelligence/WorkshopSurveyorRiskPage';
import { HighRiskEntitiesPage } from './pages/intelligence/HighRiskEntitiesPage';
import { MoneyFlowAnalysisPage } from './pages/intelligence/MoneyFlowAnalysisPage';
import { FraudHeatmapPage } from './pages/intelligence/FraudHeatmapPage';

// Phase 3B Copilot & XAI Imports
import { AICopilotWorkbenchPage } from './pages/forensics/AICopilotWorkbenchPage';
import { ExplainableAIPage } from './pages/forensics/ExplainableAIPage';

// Phase 3C Enterprise Operations Imports
import { WorkflowTaskEnginePage } from './pages/operations/WorkflowTaskEnginePage';
import { SLAEscalationPage } from './pages/operations/SLAEscalationPage';
import { DigitalApprovalsPage } from './pages/operations/DigitalApprovalsPage';
import { ComplianceDashboardPage } from './pages/operations/ComplianceDashboardPage';
import { TeamCollaborationPage } from './pages/operations/TeamCollaborationPage';

// Phase 4 Commercial Platform Imports
import { OEMIntegrationsPage } from './pages/commercial/OEMIntegrationsPage';
import { PredictiveIntelligencePage } from './pages/commercial/PredictiveIntelligencePage';
import { DeveloperPortalPage } from './pages/commercial/DeveloperPortalPage';
import { SaaSLicensingPage } from './pages/commercial/SaaSLicensingPage';
import { ExecutivePortfolioDashboardPage } from './pages/commercial/ExecutivePortfolioDashboardPage';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/dashboard');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/dashboard');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-mono text-xs">
        Initializing Commercial Platform Context...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onSuccess={() => navigate('/dashboard')} />;
  }

  const renderContent = () => {
    if (currentPath.startsWith('/claims/')) {
      const claimId = currentPath.split('/claims/')[1];
      return <ClaimDetailPage claimId={claimId} onNavigate={navigate} />;
    }

    switch (currentPath) {
      // Phase 1 Routes
      case '/claims':
        return <ClaimsPage onNavigate={navigate} />;
      case '/vehicles':
        return <VehiclesPage />;
      case '/companies':
        return <CompaniesPage />;
      case '/branches':
        return <BranchesPage />;
      case '/users':
        return <UsersPage />;
      case '/roles':
        return <RolesPage />;
      case '/activity-logs':
        return <ActivityLogsPage />;
      case '/notifications':
        return <NotificationsPage onNavigate={navigate} />;
      case '/settings':
        return <SettingsPage />;
      case '/profile':
        return <ProfilePage />;

      // Phase 2 Forensics Routes
      case '/forensics/obd':
        return <OBDAcquisitionPage />;
      case '/forensics/sensors':
        return <SensorIntelligencePage />;
      case '/forensics/canbus':
        return <CANBusForensicsPage />;
      case '/forensics/ecu':
        return <ECUForensicsPage />;
      case '/forensics/edr':
        return <EDRAnalysisPage />;
      case '/forensics/gps':
        return <GPSTelematicsPage />;
      case '/forensics/evidence':
        return <DigitalEvidenceLockerPage />;
      case '/forensics/ocr':
        return <DocumentOCRPage />;
      case '/forensics/damage':
        return <AIDamageAnalysisPage />;
      case '/forensics/investigation':
        return <AIInvestigationEnginePage />;
      case '/forensics/timeline':
        return <ForensicTimelinePage />;
      case '/forensics/workspace':
        return <InvestigatorWorkspacePage />;

      // Phase 3A Graph Intelligence Routes
      case '/intelligence/graph':
        return <FraudNetworkExplorerPage />;
      case '/intelligence/algorithms':
        return <GraphAlgorithmsPage />;
      case '/intelligence/vin-policy':
        return <VINPolicyDuplicationPage />;
      case '/intelligence/workshops':
        return <WorkshopSurveyorRiskPage />;
      case '/intelligence/entities':
        return <HighRiskEntitiesPage />;
      case '/intelligence/money-flow':
        return <MoneyFlowAnalysisPage />;
      case '/intelligence/heatmap':
        return <FraudHeatmapPage />;

      // Phase 3B Copilot Routes
      case '/forensics/copilot':
        return <AICopilotWorkbenchPage />;
      case '/forensics/explainable-ai':
        return <ExplainableAIPage />;

      // Phase 3C Enterprise Operations Routes
      case '/operations/workflow':
        return <WorkflowTaskEnginePage />;
      case '/operations/sla':
        return <SLAEscalationPage />;
      case '/operations/approvals':
        return <DigitalApprovalsPage />;
      case '/operations/compliance':
        return <ComplianceDashboardPage />;
      case '/operations/collaboration':
        return <TeamCollaborationPage />;

      // Phase 4 Commercial Platform Routes
      case '/commercial/oem':
        return <OEMIntegrationsPage />;
      case '/commercial/predictive':
        return <PredictiveIntelligencePage />;
      case '/commercial/developer':
        return <DeveloperPortalPage />;
      case '/commercial/licensing':
        return <SaaSLicensingPage />;
      case '/commercial/portfolio':
        return <ExecutivePortfolioDashboardPage />;

      case '/dashboard':
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <EnterpriseLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </EnterpriseLayout>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
