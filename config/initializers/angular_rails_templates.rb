module CustomERBEngine
  class ERBTemplate < Tilt::ERBTemplate
    def evaluate(scope, locals, &block)
      scope.class_eval do
        include ActionView::Helpers::UrlHelper
        include Rails.application.routes.mounted_helpers
        include ActionView::Helpers
      end

      super
    end
  end
end

Tilt.register CustomERBEngine::ERBTemplate, '.erb'