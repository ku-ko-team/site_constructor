class Site < ApplicationRecord
	belongs_to :user
	has_many :pages, dependent: :destroy

	validates_presence_of :name

	def as_json(options = {})
		super(options.merge(include: [:user, :pages]))
	end
end